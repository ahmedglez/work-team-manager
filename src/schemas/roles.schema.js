const Joi = require("joi")

const id = Joi.number().integer()
const name = Joi.string().min(4).max(8)
const privilege = Joi.string().min(4).max(7)

const createRoleSchema = Joi.object({
	name: name.required(),
	privilege: privilege.required(),
})

const updateRoleSchema = Joi.object({
	name: name,
	privilege: privilege,
})

const getRoleSchema = Joi.object({
	id: id.required(),
})

module.exports = {
	createRoleSchema,
	updateRoleSchema,
	getRoleSchema,
}


