const express = require("express");
const TaskController = require("./controller");
const authenticateUser = require("../../middleware/authenticateUser");
const router = express.Router();

router.post("/", authenticateUser, TaskController.create);
router.get("/", authenticateUser, TaskController.getAll);
router.get("/:id", authenticateUser, TaskController.getById);
router.post("/:id/update", authenticateUser, TaskController.update);
router.post("/:id/delete", authenticateUser, TaskController.delete);
router.post("/:id/update-type", authenticateUser, TaskController.updateType);

module.exports = router;
