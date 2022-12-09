const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
	updateUserHandler,
	updateUserPasswordHandler,
	deleteUserHandler,
	assignNewRoleHandler,
	deleteAssignedRoleHandler,
} = require("../services/users.services");

router.get("/", checkAuth, checkRoles("admin"), getAllUsersHandler);
router.get("/:id", checkAuth, checkRoles("user"), getUserByIdHandler);
router.post("/", checkAuth, checkRoles("admin"), createUserHandler);
router.post(
	"/assignNewRole/:id",
	checkAuth,
	checkRoles(["superadmin"]),
	assignNewRoleHandler
);
router.put(
	"/deleteAssignedRole/:id",
	checkAuth,
	checkRoles(["superadmin"]),
	deleteAssignedRoleHandler
);
router.put("/:id", checkAuth, checkRoles("user"), updateUserHandler);
router.put(
	"/changePassword/:id",
	checkAuth,
	checkRoles("user"),
	updateUserPasswordHandler
);
router.delete("/:id", checkAuth, checkRoles(["superadmin"]), deleteUserHandler);

module.exports = router;
