const {
	createContact,
	getAllContacts,
	getContactByEmail,
} = require("../database/crud/contact.crud");

const { sendContactEmailTo } = require("../utils/emails/sendEmails");

const ContactServices = () => {
	const createContactHandler = async (req, res, next) => {
		const { name, email, phone, message } = req.body;
		try {
			const contact = await createContact({ name, email, phone, message });
			res.status(200).json({
				data: contact,
				message: "contact created",
			});
			sendContactEmailTo(email, name, phone, message);
		} catch (error) {
			next(error);
		}
	};

	const getAllContactsHandler = async (req, res, next) => {
		try {
			const contacts = await getAllContacts();
			res.status(200).json({
				data: contacts,
				message: "all contacts",
			});
		} catch (error) {
			next(error);
		}
	};

	const getContactByEmailHandler = async (req, res, next) => {
		const { email } = req.body;
		try {
			const contact = await getContactByEmail(email);
			res.status(200).json({
				data: contact,
				message: "contact retrieved",
			});
		} catch (error) {
			next(error);
		}
	};

	return {
		createContactHandler,
		getAllContactsHandler,
		getContactByEmailHandler,
	};
};

module.exports = ContactServices;
