const rateLimiter = require("express-rate-limit");
const limiter = rateLimiter({
	windowMs: 60 * 1000, // 1 minute
	max: 5, 
	message: "Too many requests, please try again later",
});

module.exports = limiter;