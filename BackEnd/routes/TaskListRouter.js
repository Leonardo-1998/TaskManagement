const express = require("express");
const TaskListController = require("../controller/TaskListController");
const {
  validateSwapData,
  validateDataTaskList,
} = require("../middlewares/ValidateTaskList");
const router = express.Router();

router.get("/", TaskListController.getAllTasksListByUser);
router.post(
  "/create",
  validateDataTaskList,
  TaskListController.createNewTaskList,
);
router.put("/swap", validateSwapData, TaskListController.swapTaskList);
router.get("/update/:id", TaskListController.getOneTaskList);
router.put(
  "/update/:id",
  validateDataTaskList,
  TaskListController.updateTaskList,
);
router.put("/soft_delete/:id", TaskListController.softDeleteTaskList);
router.delete("/delete/:id", TaskListController.deleteTaskList);

module.exports = router;
