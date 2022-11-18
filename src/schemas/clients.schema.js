const Joi = require("joi")

const id = Joi.number().integer()
const nickname = Joi.string()
const fullName = Joi.string()
const phone = Joi.string()
const mobile = Joi.string()
const type = Joi.string()
const location = Joi.string()
const address = Joi.string()
const email = Joi.string().email()

const createUserSchema = Joi.object({
	nickname: nickname.required(),
	fullName: fullName.required(),
	phone: phone,
	mobile: mobile,
	type: type,
	location: location,
	email: email,
	address: address,
})

const updateUserSchema = Joi.object({
	nickname: nickname,
	fullName: fullName,
	phone: phone,
	mobile: mobile,
	type: type,
	location: location,
	email: email,
	address: address,
})

const getUserSchema = Joi.object({
	id: id.required(),
})

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
}
