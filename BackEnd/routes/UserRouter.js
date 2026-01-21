const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const validateUser = require("../middlewares/ValidateUser");

router.get("/", UserController.getAllUser);
router.post("/register", validateUser, UserController.registerUser);
router.post("/login", validateUser, UserController.loginUser);

module.exports = router;
