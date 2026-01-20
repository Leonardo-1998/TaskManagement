const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const errorHandler = require("../middlewares/ErrorHandler");
const userRouter = require("./UserRouter");
const taskRouter = require("./TaskRouter");
const taskListRouter = require("./TaskListRouter");
const authentication = require("../middlewares/Authentication");
const validateUser = require("../middlewares/ValidateUser");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", validateUser, userRouter);

app.use(authentication);
app.use("/api/task_list", taskListRouter);
app.use("/api/task/:task_list_id", taskRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
