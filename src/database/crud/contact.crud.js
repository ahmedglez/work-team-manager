const ContactModel = require("../../schemas/contact.schema");

const createContact = async (contact) => {
	const newContact = new ContactModel(contact);
	return await newContact.save();
};

const getAllContacts = async () => {
	return await ContactModel.find({});
};

const getContactByEmail = async (email) => {
	return await ContactModel.findOne({ email });
};

module.exports = {
	createContact,
	getAllContacts,
	getContactByEmail,
};
