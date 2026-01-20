const express = require("express");
const TaskListController = require("../controller/TaskListController");
const authentication = require("../middlewares/Authentication");
const router = express.Router();

// router.get("/", TaskListController.getAllTasksList);
router.get("/", authentication, TaskListController.getAllTasksListByUser);
router.post("/create", authentication, TaskListController.createNewTaskList);
router.put("/update/:id", TaskListController.updateTaskList);
router.delete("/delete/:id", TaskListController.deleteTaskList);

module.exports = router;
