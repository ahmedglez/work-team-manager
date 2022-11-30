const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth.handler");

const {
	getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
} = require("../services/users.services");

router.get("/", checkAuth, getAllUsersHandler);
router.get("/:id", checkAuth, getUserByIdHandler);
router.post("/", checkAuth, createUserHandler);
router.put("/:id", checkAuth, updateUserHandler);
router.delete("/:id", checkAuth, deleteUserHandler);

module.exports = router;
