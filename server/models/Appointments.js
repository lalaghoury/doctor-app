const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
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
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    zoom_link: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "rejected", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
