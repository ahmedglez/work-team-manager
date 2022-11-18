const Joi = require("joi")

const id = Joi.number().integer()
const title = Joi.string()
const description = Joi.string()
const address = Joi.string()
const client = Joi.object()
const importance = Joi.number()
const state = Joi.number()
const date = Joi.date()

const createTaskSchema = Joi.object({
	title: title.required(),
	description: description.default(""),
	address: address.default(""),
	client: client.required().default({}),
	importance: importance.required().default(1),
	state: state.required().default(1),
	date: date.required().default(Date.now()),
})

const updateTaskSchema = Joi.object({
	title: title,
	description: description,
	address: address,
	client: client,
	importance: importance,
	users: users,
	state: state,
	date: date,
})

const getTaskSchema = Joi.object({
	id: id.required(),
})

module.exports = {
	createTaskSchema,
	updateTaskSchema,
	getTaskSchema,
}
