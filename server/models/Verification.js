const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true },
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
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    address: { type: String, required: true },
    speciality: { type: String, required: true },
    degreeName: { type: String, required: true },
    degreeType: { type: String, required: true },
    degreeInstitution: { type: String, required: true },
    degreeYear: { type: Number, required: true },
    degreeCity: { type: String, required: true },
    degreeVerificationType: { type: String, required: true },
    degreeState: { type: String },
    degreeCountry: { type: String, required: true },
    degreeDescription: { type: String },
    verified: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    attachments: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationSchema);
