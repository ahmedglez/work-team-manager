const express = require("express");
const router = express.Router();
const ContactServices = require("../services/contact.services");

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const service = ContactServices();

router.get("/", checkAuth, checkRoles("admin"), service.getAllContactsHandler);
router.post("/", service.createContactHandler);
router.get(
	"/:email",
	service.getContactByEmailHandler
);

module.exports = router;
