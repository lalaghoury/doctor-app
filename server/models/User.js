const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "blocked"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      maxlength: 18,
      validate: {
        validator: function (v) {
          return /^(\+?\d{1,3})?[-. (]*\d{3}[-. )]*\d{3}[-. ]*\d{4}$/.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
    resetToken: { type: String, default: "" },
    resetTokenExpiration: { type: Date, default: null },
    fieldInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verification",
    },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: { type: String },
    speciality: { type: String },
    degreeName: { type: String },
    degreeType: { type: String },
    degreeInstitution: { type: String },
    degreeYear: { type: Number },
    degreeCity: { type: String },
    degreeVerificationType: { type: String },
    degreeState: { type: String },
    degreeCountry: { type: String },
    degreeDescription: { type: String },
    verified: { type: Boolean, default: false },
    attachments: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
