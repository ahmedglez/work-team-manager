const success = (req, res, message, data, status) => {
	res.status(status || 200).send({
		message: message,
		data: data,
	});
};

const error = (req, res, message, status, details) => {
	console.error("[response error] " + details + ": " + message + "\n");

	res.status(status || 500).send({
		error: message,
		body: "",
	});
};

module.exports = {
	success,
	error,
};
