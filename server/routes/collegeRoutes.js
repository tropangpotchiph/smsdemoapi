const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, collegeController.getColleges);
router.get("/:id", authMiddleware, collegeController.getCollegeById);
router.post("/", authMiddleware, collegeController.createCollege);
router.put("/:id", authMiddleware, collegeController.updateCollege);
router.delete("/:id", authMiddleware, collegeController.deleteCollege);

// Create a course for a specific college
router.post(
  "/:collegeId/courses",
  authMiddleware,
  courseController.createCourse
);

module.exports = router;
