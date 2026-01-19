const express = require("express");
const TaskListController = require("../controller/TaskListController");
const router = express.Router();

router.post("/create", TaskListController.createNewTaskList);
router.put("/update/:id", TaskListController.updateTaskList);
router.delete("/delete/:id", TaskListController.deleteTaskList);

module.exports = router;
