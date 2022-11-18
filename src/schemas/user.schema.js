const Joi = require("joi")

const id = Joi.number().integer()
const nickname = Joi.string()
const fullName = Joi.string()
const phone = Joi.string()
const mobile = Joi.string()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(4).max(10)
const address = Joi.string()
const ci = Joi.string()

const createUserSchema = Joi.object({
	nickname: nickname.required(),
	fullName: fullName.required(),
	phone: phone,
	mobile: mobile,
	email: email,
	password: password.required(),
	role: role.required(),
	ci: ci.required(),
	address: address,
})

const updateUserSchema = Joi.object({
	nickname: nickname,
	fullName: fullName.required(),
	phone: phone,
	mobile: mobile,
	email: email,
	password: password,
	role: role,
	ci: ci,
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
