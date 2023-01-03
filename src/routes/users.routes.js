const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const UserServices = require("../services/users.services");

const service = UserServices();

router.get("/", checkAuth, checkRoles("admin"), service.getAllUsersHandler);
router.get("/:id", checkAuth, checkRoles("user"), service.getUserByIdHandler);
router.post("/", checkAuth, checkRoles("admin"), service.createUserHandler);
router.post(
	"/assignNewRole/:id",
	checkAuth,
	checkRoles(["superadmin"]),
	service.assignNewRoleHandler
);
router.put(
	"/deleteAssignedRole/:id",
	checkAuth,
	checkRoles(["superadmin"]),
	service.deleteAssignedRoleHandler
);
router.put("/:id", checkAuth, checkRoles("user"), service.updateUserHandler);
router.put(
	"/changePassword/:id",
	checkAuth,
	checkRoles("user"),
	service.updateUserPasswordHandler
);
router.delete(
	"/:id",
	checkAuth,
	checkRoles(["superadmin"]),
	service.deleteUserHandler
);

module.exports = router;
