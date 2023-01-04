const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const ProfileServices = require("../services/profile.services");
const service = ProfileServices();

router.get(
	"/",
	checkAuth,
	checkRoles("user"),
	service.getPersonalInformationHandler
);

router.put(
	"/",
	checkAuth,
	checkRoles("user"),
	service.updatePersonalInformationHandler
);

router.put(
	"/password",
	checkAuth,
	checkRoles("user"),
	service.updatePasswordHandler
);

router.delete("/", checkAuth, checkRoles("user"), service.deleteAccountHandler);

module.exports = router;
