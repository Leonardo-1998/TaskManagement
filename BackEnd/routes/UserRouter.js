const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.getAllUsers);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

module.exports = router;
