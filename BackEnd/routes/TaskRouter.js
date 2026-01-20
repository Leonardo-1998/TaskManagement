const express = require("express");
const TaskController = require("../controller/TaskController");
const router = express.Router({ mergeParams: true });

router.get("/", TaskController.getTaskByTaskListId);
router.post("/create", TaskController.createNewTask);
router.put("/update/:id", TaskController.updateTask);
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
