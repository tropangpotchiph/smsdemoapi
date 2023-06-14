const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", courseController.getCourses);
router.get("/:collegeId/:id", courseController.getCourse);
router.post("/:collegeId", authMiddleware, courseController.createCourse);
router.put("/:collegeId/:id", authMiddleware, courseController.updateCourse);
router.delete("/:collegeId/:id", authMiddleware, courseController.deleteCourse);

module.exports = router;
