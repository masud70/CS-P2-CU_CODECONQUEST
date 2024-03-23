const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: "cppvitamin@gmail.com",
		pass: "wwzsfsrunzdosrew",
	},
});

module.exports = {
	getRandomChars: (string, length) => {
		let result = "";
		const stringLength = string.length;
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * stringLength);
			result += string.charAt(randomIndex);
		}
		return result;
	},

	sendMail: async ({ email, body }) => {
		try {
			const info = await transporter.sendMail({
				from: "cppvitamin@gmail.com",
				to: email,
				subject: "EcoSync official",
				text: body.text,
				html: body.html,
			});

			return {
				success: true,
				message: "Email sent successfully!",
				info: info,
			};
		} catch (error) {
			return {
				success: false,
				message: "Email could not send!",
				error: error.message,
			};
		}
	},
};
