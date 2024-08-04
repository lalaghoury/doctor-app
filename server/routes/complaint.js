// server\routes\complaint.js
const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController.js");
const {
  requireSignin,
  isDoctor,
  isPatient,
} = require("../middlewares/authMiddleware");

// Patient Routes

// @route POST api/complaints/patient/create for patient
router.post(
  "/patient/create",
  requireSignin,
  isPatient,
  complaintController.createComplaint
);

// @route GET api/complaints/patient/get for patient
router.get(
  "/patient/get",
  requireSignin,
  isPatient,
  complaintController.getComplaints
);

// Doctor Routes

// @route GET api/complaints/doctor/get for doctor
router.get(
  "/doctor/get",
  requireSignin,
  isDoctor,
  complaintController.getComplaints
);

module.exports = router;
