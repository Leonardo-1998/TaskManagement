const express = require("express");
const TaskController = require("../controller/TaskController");
const {
  validateDataTask,
  validateSwapData,
} = require("../middlewares/ValidateTask");
const router = express.Router({ mergeParams: true });

router.get("/", TaskController.getTaskByTaskListId);
router.post("/create", validateDataTask, TaskController.createNewTask);
router.put("/swap", validateSwapData, TaskController.swapTask);
router.get("/update/:id", TaskController.getTaskById);
router.put("/update/:id", validateDataTask, TaskController.updateTask);
router.put("/soft_delete/:id", TaskController.softDeleteTask);
router.delete("/delete/:id", TaskController.deleteTask);

module.exports = router;
