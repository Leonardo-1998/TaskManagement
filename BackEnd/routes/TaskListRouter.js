const express = require("express");
const TaskListController = require("../controller/TaskListController");
const router = express.Router();

router.get("/", TaskListController.getAllTasksListByUser);
router.post("/create", TaskListController.createNewTaskList);
router.put("/swap", TaskListController.swapTaskList);
router.get("/update/:id", TaskListController.getOneTaskList);
router.put("/update/:id", TaskListController.updateTaskList);
router.put("/soft_delete/:id", TaskListController.softDeleteTaskList);
router.delete("/delete/:id", TaskListController.deleteTaskList);

module.exports = router;
