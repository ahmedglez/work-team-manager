const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const handlebars = require("handlebars");
const fs = require("fs");
const { getUserByEmail } = require("../database/crud/usersCrud");
const path = require("path");
const readHTMLFile = require("./readHtmlFile");

const sendRecoveryCodeTo = async (email, code) => {
	const user = await getUserByEmail(email);
	const firstName = user.rows[0].fullname.split(" ")[0];

	const transporter = nodemailer.createTransport(
		smtpTransport({
			service: "gmail",
			host: process.env.EMAIL_HOST,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		})
	);

	readHTMLFile(
		path.join(__dirname, "../assets/templates/email-template/index.html"),
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
				from: process.env.EMAIL_USER,
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
};

module.exports = { sendRecoveryCodeTo };
