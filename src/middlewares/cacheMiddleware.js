const redis = require("redis");
const client = redis.createClient();

const cacheMiddleware = (req, res, next) => {
	const key = "__express__" + req.originalUrl || req.url;
	client.get(key, (err, data) => {
		if (err) throw err;

		if (data !== null) {
			res.send(JSON.parse(data));
		} else {
			res.sendResponse = res.send;
			res.send = (body) => {
				client.set(key, JSON.stringify(body));
				res.sendResponse(body);
			};
			next();
		}
	});
};


module.exports = cacheMiddleware
