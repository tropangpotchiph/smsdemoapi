const express = require("express");
const router = express.Router();
const userLevelController = require("../controllers/userLevelController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, userLevelController.getUserLevels);
router.get("/:id", authMiddleware, userLevelController.getUserLevel);
router.post("/", authMiddleware, userLevelController.createUserLevel);
router.put("/:id", authMiddleware, userLevelController.updateUserLevel);
router.delete("/:id", authMiddleware, userLevelController.deleteUserLevel);

module.exports = router;
