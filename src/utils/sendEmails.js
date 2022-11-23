const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const sendRecoveryCodeTo = async (email, code) => {
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

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Sending Email using Node.js[nodemailer]",
		text: `That was easy! ${code}` ,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

sendRecoveryCodeTo("ahmediglez@gmail.com", "1234");
