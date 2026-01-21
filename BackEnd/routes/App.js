const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const errorHandler = require("../middlewares/ErrorHandler");
const userRouter = require("./UserRouter");
const taskRouter = require("./TaskRouter");
const taskListRouter = require("./TaskListRouter");
const collaboratorRouter = require("./CollaboratorRouter");
const authentication = require("../middlewares/Authentication");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);

app.use(authentication);
app.use("/api/task_list", taskListRouter);
app.use("/api/task/:task_list_id", taskRouter);
app.use("/api/collaborator/", collaboratorRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
