const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", authMiddleware, departmentController.createDepartment);
router.put("/:id", authMiddleware, departmentController.updateDepartment);
router.delete("/:id", authMiddleware, departmentController.deleteDepartment);

module.exports = router;
