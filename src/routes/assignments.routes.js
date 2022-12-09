const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	assingTaskToUser,
	desassingTaskToUser,
} = require("../services/assignments.services");

router.post("/assing", checkAuth, checkRoles(["admin"]), assingTaskToUser);
router.post(
	"/desassing",
	checkAuth,
	checkRoles(["admin"]),
	desassingTaskToUser
);

module.exports = router;
