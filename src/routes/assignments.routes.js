const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const AssignmentsServices = require("../services/assignments.services");
const service = AssignmentsServices();

router.post(
	"/assing",
	checkAuth,
	checkRoles("admin"),
	service.assingTaskToUser
);
router.post(
	"/desassing",
	checkAuth,
	checkRoles("admin"),
	service.desassingTaskToUser
);

module.exports = router;
