// server\controllers\appointmentController.js
const Appointment = require("../models/Appointments");

module.exports = appointmentController = {
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({
        $or: [{ doctor: req.user._id }, { patient: req.user._id }],
      });
      res.status(200).json({
        success: true,
        appointments,
        message: "All appointments fetched successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to get appointments",
      });
    }
  },
  getRecentAppointmentList: async (req, res) => {
    try {
      const appointments = await Appointment.find({
        $or: [{ doctor: req.user._id }, { patient: req.user._id }],
      });
      res.status(200).json({
        success: true,
        appointments,
        message: "All appointments fetched successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to get appointments",
      });
    }
  },
  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find({
        patient: req.user._id,
      });
      res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to get appointments",
      });
    }
  },
  createAppointment: async (req, res) => {
    const { patient, doctor, date, time } = req.body;
    if (!patient || !doctor || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const Zoom = require("zoomus");
    const zoom = new Zoom({
      apiKey: process.env.ZOOM_API_KEY,
      apiSecret: process.env.ZOOM_API_SECRET,
      accessToken: process.env.ZOOM_ACCESS_TOKEN,
      accessTokenSecret: process.env.ZOOM_ACCESS_TOKEN_SECRET,
    });
    const meetingTopic = `Booked Appointment by ${req.user.name} on ${date}`;
    const meeting = {
      topic: meetingTopic,
      type: 2,
      start_time: new Date(date).toISOString(),
      duration: 60,
      timezone: "Asia/Kolkata",
      password: "123456",
      agenda: "Booked Appointment",
      settings: {
        host_video: true,
        participant_video: true,
        cn_meeting: true,
        in_meeting: true,
        join_before_host: true,
        mute_upon_entry: true,
        watermark: true,
        use_pmi: false,
        approval_type: 2,
        registration_type: 3,
        audio: "voip",
        calendar_type: 1,
      },
    };

    try {
      const createdMeeting = await zoom.meeting.create(meeting);
      const appointment = new Appointment({
        patient,
        doctor,
        date,
        time,
        meetingId: createdMeeting.id,
      });
      try {
        const savedAppointment = await appointment.save();
        res.status(201).json({
          success: true,
          message: "Appointment created successfully",
          data: savedAppointment,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
          message: "Failed to create appointment",
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to create meeting",
      });
    }
    const appointment = new Appointment({
      patient,
      doctor,
      date,
      time,
    });
    try {
      const savedAppointment = await appointment.save();
      res.status(201).json({
        success: true,
        message: "Appointment created successfully",
        data: savedAppointment,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to create appointment",
      });
    }
  },
  updateAppointment: async (req, res) => {
    const { patient, doctor, date, time } = req.body;
    const id = req.params.id;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        {
          patient,
          doctor,
          date,
          time,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Appointment updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to update appointment",
      });
    }
  },
  deleteAppointment: async (req, res) => {
    const id = req.params.id;
    try {
      await Appointment.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to delete appointment",
      });
    }
  },
  updateAppointmentStatus: async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        {
          status,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Appointment status updated successfully",
        data: updatedAppointment,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
        message: "Failed to update appointment status",
      });
    }
  },
};
