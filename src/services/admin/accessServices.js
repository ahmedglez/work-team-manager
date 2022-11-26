const { getUserByEmail } = require('../../database/crud/usersCrud')
const { generateLog } = require('../../middlewares/generateLog')
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");