// server\routes\doctor.js
const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController.js");
const {
  requireSignin,
  isDoctor,
  isPatient,
} = require("../middlewares/authMiddleware");

// @route GET api/doctor/get for doctor
router.get("/all", requireSignin, doctorController.getAllDoctors);

module.exports = router;
