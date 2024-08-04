const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const {
  requireSignin,
  isAdmin,
  isPatient,
  isDoctor,
} = require("../middlewares/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Doctor-app\routes\auth.js
router.post("/sign-in", authController.signIn);
router.post("/sign-up", authController.signUp);
router.post("/sign-out", authController.signOut);

// Doctor Routes
router.post("/sign-in", authController.signIn);
router.post(
  "/sign-up/doctor",
  upload.array("attachments", 5),
  authController.doctorSignUp
);

// Reset Password Link Send
router.post("/forgot-password", authController.sendVerificationLink);

// Reset Password
router.post("/reset-password/:resetToken", authController.resetPassword);

// Doctor-app\routes\auth.js~Verified
router.get(
  "/verify/patient",
  requireSignin,
  isPatient,
  authController.verified
);
router.get("/verify/doctor", requireSignin, isDoctor, authController.verified);
router.get("/verify/admin", requireSignin, isAdmin, authController.verified);

module.exports = router;
