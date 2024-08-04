// server\controllers\complaintController.js

const Complaint = require("../models/Complaints");

const complaintController = {
  createComplaint: async (req, res) => {
    try {
      const complaint = await Complaint.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Complaint created successfully",
        data: complaint,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getComplaints: async (req, res) => {
    try {
      const complaints = await Complaint.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "All complaints fetched successfully",
        data: complaints,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

module.exports = complaintController;
