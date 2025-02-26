const express = require("express");
const multer = require("multer");
const Assignment = require("../models/Assignment");
const Student = require("../models/Student");

const router = express.Router();

// Multer Storage Setup for File Uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Create Assignment API (For All Students)
router.post("/create", upload.single("attachment"), async (req, res) => {
  try {
    const { title, description, subject, startDate, dueDate } = req.body;
    const students = await Student.find();

    if (!students.length) {
      return res.status(400).json({ error: "No students found!" });
    }

    const assignments = students.map((student) => ({
      title,
      description,
      subject,
      startDate,
      dueDate,
      studentId: student._id,
      attachment: req.file ? req.file.buffer.toString("base64") : null, // Storing file as base64
    }));

    await Assignment.insertMany(assignments);
    res.status(201).json({ message: "Assignment created for all students!" });
  } catch (error) {
    console.error("Assignment creation error:", error);
    res.status(500).json({ error: "Failed to create assignment" });
  }
});

// ✅ Fetch All Assignments API
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("studentId", "name");
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// ✅ Fetch Assignments for a Specific Student (Used in Parent Dashboard)
router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const assignments = await Assignment.find({ studentId });

    if (!assignments.length) {
      return res.status(404).json({ message: "No assignments found for this student" });
    }

    res.json(assignments);
  } catch (error) {
    console.error("Error fetching student assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

module.exports = router;
