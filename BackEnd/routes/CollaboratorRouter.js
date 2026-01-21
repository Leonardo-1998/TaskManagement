const express = require("express");
const CollaboratorController = require("../controller/CollaboratorController");
const router = express.Router();

router.post("/add", CollaboratorController.addCollaborator);

module.exports = router;
