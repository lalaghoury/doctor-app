const useRoutes = (app) => {
  // Welcome Route
  app.get("/", (req, res) => {
    res.send("Assalom-Alaikum! Euphoria Backend API");
  });

  // User Routes
  const userRouter = require("../routes/user");
  app.use("/api/users", userRouter);

  // Auth Routes
  const authRouter = require("../routes/auth");
  app.use("/api/auth", authRouter);

  // Appointments Routes
  const appointmentRouter = require("../routes/appointment");
  app.use("/api/appointments", appointmentRouter);

  // Appointments Routes
  const doctorRouter = require("../routes/doctor");
  app.use("/api/doctor", doctorRouter);

  // Complaints Routes
  const complaintRouter = require("../routes/complaint");
  app.use("/api/complaint", complaintRouter);

  // Image Routes
  const imageRouter = require("../routes/image");
  app.use("/api/images", imageRouter);
};

module.exports = useRoutes;
