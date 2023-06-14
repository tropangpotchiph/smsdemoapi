const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  // Add other fields as needed
  name: {
    type: String,
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
