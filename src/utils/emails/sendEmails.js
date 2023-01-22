const { config } = require("../../config/enviroment.config");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const { getUserByEmail } = require("../../database/crud/users.crud");
const path = require("path");

function readHTMLFile(path, callback) {
	fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
		if (err) {
			callback(err);
		} else {
			callback(null, html);
		}
	});
}

const sendRecoveryCodeTo = async (email, code) => {
	try {
		const user = await getUserByEmail(email);
		const firstName = user.fullname.split(" ")[0];
		const transporter = nodemailer.createTransport(
			smtpTransport({
				service: "gmail",
				host: config.development.email_host,
				secure: true,
				auth: {
					user: config.development.email_user,
					pass: config.development.email_pass,
				},
			})
		);

		readHTMLFile(
			path.join(__dirname, "../../templates/emails/recoveryCode.html"),
			function (err, html) {
				if (err) {
					console.log("error reading file", err);
					return;
				}

				const template = handlebars.compile(html);
				const replacements = {
					username: firstName,
					verificationCode: code,
				};
				const htmlToSend = template(replacements);

				const mailOptions = {
					from: config.development.email_user,
					to: email,
					subject: "Recuperacion de contraseña",
					html: htmlToSend,
				};

				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log("Email sent: " + info.response);
					}
				});
			}
		);
	} catch (error) {
		throw new Error("Error on sending email");
	}
};

module.exports = { sendRecoveryCodeTo };
