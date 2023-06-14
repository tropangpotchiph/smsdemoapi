const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, employeeController.getEmployees);
router.get("/:id", authMiddleware, employeeController.getEmployee);

router.post("/", authMiddleware, employeeController.createEmployee);
router.put("/:id", authMiddleware, employeeController.updateEmployee);
router.delete("/:id", authMiddleware, employeeController.deleteEmployee);

router.get(
  "/department/:department",
  authMiddleware,
  employeeController.getEmployeesByDepartment
);

module.exports = router;
