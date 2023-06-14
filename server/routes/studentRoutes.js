const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, studentController.getStudents);
router.get("/:id", authMiddleware, studentController.getStudent);
router.post("/", authMiddleware, studentController.createStudent);
router.put("/:id", authMiddleware, studentController.updateStudent);
router.delete("/:id", authMiddleware, studentController.deleteStudent);

// Retrieve students by college
router.get(
  "/college/:collegeId",
  authMiddleware,
  studentController.getStudentsByCollege
);

// Retrieve students by course
router.get(
  "/course/:courseId",
  authMiddleware,
  studentController.getStudentsByCourse
);

module.exports = router;
