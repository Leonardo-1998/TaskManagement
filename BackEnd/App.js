const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const UserController = require("./controller/UserController");
const errorHandler = require("./middlewares/ErrorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/user/", UserController.getAllUsers);
app.post("/api/user/register", UserController.registerUser);
app.post("/api/user/login", UserController.loginUser);
app.get("/api/user/:email", UserController.getUserByEmail);

app.get("/test", (req, res) => {
  res.send("Routing bekerja!");
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
