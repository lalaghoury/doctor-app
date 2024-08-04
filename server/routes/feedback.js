// server\routes\feedback.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController.js");
const {
  requireSignin,
  isDoctor,
  isPatient,
} = require("../middlewares/authMiddleware");

// Doctor Routes

// @route POST api/feedback/doctor/create for doctor
router.post(
  "/doctor/create",
  requireSignin,
  isPatient,
  feedbackController.createFeedback
);

// @route GET api/feedback/doctor/get for doctor
router.get(
  "/doctor/get",
  requireSignin,
  isDoctor,
  feedbackController.getFeedbacks
);

module.exports = router;
