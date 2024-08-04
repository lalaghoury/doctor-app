const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController.js");
const {
  requireSignin,
  isDoctor,
  isPatient,
} = require("../middlewares/authMiddleware");

// Patient Routes

// @route POST api/appointments/patient/create for patient
router.post(
  "/patient/create",
  requireSignin,
  isPatient,
  appointmentController.createAppointment
);

// @route GET api/appointments/patient/get for patient
router.get(
  "/patient/get",
  requireSignin,
  isPatient,
  appointmentController.getAppointments
);

// @route PUT api/appointments/patient/status/:id for patient
router.put(
  "/patient/status/:id",
  requireSignin,
  isPatient,
  appointmentController.updateAppointmentStatus
);

// Doctor Routes

// @route GET api/appointments/doctor/get for doctor
router.get(
  "/recent",
  requireSignin,
  appointmentController.getRecentAppointmentList
);

// @route GET api/appointments/doctor/get for doctor
router.get("/all", requireSignin, appointmentController.getAllAppointments);

// @route PUT api/appointments/doctor/status/:id for doctor
router.put(
  "/doctor/status/:id",
  requireSignin,
  isDoctor,
  appointmentController.updateAppointmentStatus
);

module.exports = router;
