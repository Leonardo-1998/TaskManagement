const express = require("express");
const TaskListController = require("../controller/TaskListController");
const router = express.Router();

// router.get("/", TaskListController.getAllTasksList);
router.get("/", TaskListController.getAllTasksListByUser);
router.post("/create", TaskListController.createNewTaskList);
router.get("/update/:id", TaskListController.getOneTaskList);
router.put("/update/:id", TaskListController.updateTaskList);
router.delete("/delete/:id", TaskListController.deleteTaskList);

module.exports = router;
