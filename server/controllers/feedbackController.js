const Feedback = require("../models/Feedback");

module.exports = feedbackController = {
  createFeedback: async (req, res) => {
    try {
      const { content, rating } = req.body;

      if (!content || !rating) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
      const feedback = new Feedback({
        author: req.user._id,
        content,
        rating,
      });
      await feedback.save();
      res.status(200).json({ success: true, message: "Feedback created" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message, message: "Failed to create feedback" });
    }
  },

  getFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ author: req.user._id });
      res.status(200).json({ success: true, feedbacks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message, message: "Failed to get feedbacks" });
    }
  },
};
