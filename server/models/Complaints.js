const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintsSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required"],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Doctor is required"],
    },
    complaint: {
      type: String,
      required: [true, "Complaint is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaints", complaintsSchema);
