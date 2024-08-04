const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../config/nodemailerConfig");
const { SignToken } = require("../middlewares/authMiddleware");
const Verification = require("../models/Verification");
const { s3 } = require("../config/awsConfig");
const crypto = require("node:crypto");

module.exports = authController = {
  signUp: async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    if (!email || !name || !password || !role || !phone) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
      });

      const savedUser = await newUser.save();

      sendEmail(
        savedUser.email,
        "Account Created",
        `Welcome ${savedUser.name}! You have successfully created an account , Baobao.`,
        `
          <p style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 1rem; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 0.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 400px;">Click <a style="text-decoration: none; color: #4CAF50; background-color: #f5f5f5; padding: 14px 20px; margin: 8px 0; border: none; display: inline-block; cursor: pointer; width: 100%;" href="${process.env.CLIENT_URL}/auth/sign-in" target="_blank">here</a> to login</p>
        `
      );

      res.status(201).json({
        message: "Account created successfully",
        success: true,
        user: savedUser,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        success: false,
        message: "Error while creating account, please try again",
      });
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User with that email does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = SignToken(user._id);

    sendEmail(
      user.email,
      "Login Successful",
      `Hi ${user.name}, welcome to our platform!`,
      `<html lang="en" className="scroll-smooth">
          <head>
            <style>
              p {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                padding: 1rem;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 400px;
              }
            </style>
          </head>
          <body>
            <p>Hi ${user.name}, welcome to our platform!.</p>
            <button style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; width: 100%;">
              <a style="text-decoration: none; color: white;" href="${process.env.CLIENT_AUTH_SUCCESS_URL}" target="_blank">Click here</a>
            </button>
          </body>
        </html>`
    );

    try {
      res.json({
        message: "Sign in successful!",
        success: true,
        user: {
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          _id: user._id,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        success: false,
        message: "Error while signing in, please try again",
      });
    }
  },

  signOut: (req, res) => {
    try {
      res
        .status(200)
        .json({ message: "Logged out successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Failed to logout",
        success: false,
        error: error.message,
      });
    }
  },

  verified: (req, res) => {
    try {
      const user = req.user;
      res
        .status(200)
        .json({ message: "Sign in successful!", success: true, user });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        success: false,
        message: "Something went wrong",
      });
    }
  },

  doctorSignUp: async (req, res) => {
    const {
      name,
      email,
      password,
      phone,
      birthDate,
      gender,
      address,
      speciality,
      degreeName,
      degreeType,
      degreeInstitution,
      degreeYear,
      degreeCity,
      degreeCountry,
      degreeVerificationType,
    } = req.body;
    const files = req.files;

    if (
      !email ||
      !name ||
      !password ||
      !phone ||
      !birthDate ||
      !gender ||
      !address ||
      !speciality ||
      !degreeName ||
      !degreeType ||
      !degreeInstitution ||
      !degreeYear ||
      !degreeCity ||
      !degreeCountry ||
      !degreeVerificationType
    ) {
      return res
        .status(400)
        .json({ message: "Some required fields are missing", success: false });
    }

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role: "doctor",
      });

      const uploadResults = await Promise.all(
        files.map((file) => {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
          };
          return s3.upload(params).promise();
        })
      );

      const attachments = uploadResults.map((result) => ({
        url: result.Location,
        fileName: files.find((file) => result.Key.includes(file.originalname))
          .originalname,
        mimeType: files.find((file) => result.Key.includes(file.originalname))
          .mimetype,
      }));

      const newVerification = new Verification({
        ...req.body,
        attachments,
        userId: newUser._id,
      });

      const savedVerification = await newVerification.save();

      const education = {
        speciality,
        degreeName,
        degreeType,
        degreeInstitution,
        degreeYear,
        degreeCity,
        degreeCountry,
        degreeVerificationType,
      };
      newUser.verification = savedVerification._id;
      const savedUser = await newUser.save();

      sendEmail(
        savedUser.email,
        "Account Created",
        `Welcome ${savedUser.name}! You have successfully created an account , Baobao.
        Because you are a doctor, your account will be reviewed by our team.
        You can check your verification status by clicking on the link below.`,
        `
          <p style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; padding: 1rem; background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 0.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); max-width: 400px;">Click <a style="text-decoration: none; color: #4CAF50; background-color: #f5f5f5; padding: 14px 20px; margin: 8px 0; border: none; display: inline-block; cursor: pointer; width: 100%;" href="${process.env.CLIENT_URL}/auth/sign-in" target="_blank">here</a> to login</p>
        `
      );

      res.status(201).json({
        message: "Account created successfully, please sign in",
        success: true,
        user: savedUser,
        verification: savedVerification,
      });
    } catch (error) {
      console.log("🚀 ~ doctorSignUp: ~ error:", error);
      res.status(400).json({
        error: error.message,
        success: false,
        message: "Error while creating account, please try again",
      });
    }
  },

  sendVerificationLink: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      if (req.user && req.user._id !== user._id) {
        return res.status(404).json({ success: false, error: "Wrong Email!" });
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
      await User.findOneAndUpdate(
        { email },
        { resetToken, resetTokenExpiration: expirationTime }
      );
      const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;
      await sendEmail(
        email,
        "Password Reset",
        "_",
        `
        <html lang="en" className="scroll-smooth">
          <head>
            <style>
              p {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                color: #333;
                padding: 1rem;
                background-color: #f5f5f5;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 400px;
              }
            </style>
          </head>
          <body>
            <p>Hi ${user.name} Please click on this link to reset your password: </p>
            <p>This link will expire in 10 minutes</p>
            <a href="${resetUrl}" target="_blank" style="text-decoration: none; color: #4CAF50; background-color: #f5f5f5; padding: 14px 20px; margin: 8px 0; border: none; display: inline-block; cursor: pointer; width: 100%; font-size: 20px; display: flex; align-items: center; justify-content: center;">Click here</a>
          </body>
          `
      );
      res
        .status(200)
        .json({ success: true, message: "Reset link sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Error while sending reset link",
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { resetToken } = req.params;
      const { password } = req.body;
      const user = await User.findOne({ resetToken });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found, Try again" });
      }

      if (user.resetTokenExpiration < new Date()) {
        return res
          .status(404)
          .json({ success: false, message: "Link expired, Try again" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.findOneAndUpdate(
        { resetToken },
        {
          password: hashedPassword,
          resetToken: "",
          resetTokenExpiration: null,
        }
      );
      res
        .status(200)
        .json({ success: true, message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: "Failed to change password, Try again",
      });
    }
  },

  // TODO: DO this in admin dashboard
  getRequests: async (req, res) => {},
};
