const User = require("../models/User.js");

module.exports = doctorController = {
  getAllDoctors: async (req, res) => {
    try {
      const users = await User.find({ role: "doctor" }).populate(
        "verification"
      );
      const doctors = users.map((user) => {
        return {
          _id: user._id,
          name: user.verification.name,
          email: user.verification.email,
          phone: user.verification.phone,
          birthDate: user.verification.birthDate,
          gender: user.verification.gender,
          address: user.verification.address,
          speciality: user.verification.speciality,
          degreeName: user.verification.degreeName,
          degreeType: user.verification.degreeType,
          degreeInstitution: user.verification.degreeInstitution,
          degreeYear: user.verification.degreeYear,
          degreeCity: user.verification.degreeCity,
          degreeVerificationType: user.verification.degreeVerificationType,
          degreeState: user.verification.degreeState,
          degreeCountry: user.verification.degreeCountry,
          degreeDescription: user.verification.degreeDescription,
          verified: user.verification.verified,
        };
      });

      res.status(200).json({
        success: true,
        count: doctors.length,
        data: doctors,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to get doctors",
      });
    }
  },
};
