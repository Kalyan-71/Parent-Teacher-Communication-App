const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  subject: String,
  startDate: String,
  dueDate: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  attachment: String, // Store file as Base64 (or use GridFS for large files)
});

module.exports = mongoose.model("Assignment", assignmentSchema);
