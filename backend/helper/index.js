const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const db = require("../models");
const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_SECRET,
	},
});

module.exports = {
	getRandomChars: (length) => {
		const string = "QWERTYUIOPLKJHGFDSAZXCVBNM1209348756";
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

	generateToken: ({ email, userId }) => {
		const token = jwt.sign(
			{
				userId: userId,
				email: email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);
		return token;
	},

	initializeDB: async () => {
		try {
			const roles = [
				{ title: "system_admin" },
				{ title: "sts_manager" },
				{ title: "landfill_manager" },
				{ title: "unassigned" },
			];
			const permissions = [
				{ type: "update" },
				{ type: "delete" },
				{ type: "select" },
				{ type: "create" },
			];
			const systemAdmin = {
				email: "mdmasud.csecu@gmail.com",
				password:
					"$2b$10$CV/kUVCgdiNKvAGrVrjVfuPoxZRFol3pZi21QBEdiKXi.6Yy4CEjO",
			};

			const admin = await db.User.findOrCreate({
				where: { email: systemAdmin.email },
				defaults: systemAdmin,
			});
			const adminRole = await db.Role.findOrCreate({
				where: { title: "system_admin" },
			});

			await db.UserRole.findOrCreate({
				where: {
					UserId: admin[0].id,
					RoleId: adminRole[0].id,
				},
			});

			roles.map(async (role) => {
				await db.Role.findOrCreate({
					where: role,
				});
			});

			permissions.map(async (permission) => {
				await db.Permission.findOrCreate({
					where: permission,
				});
			});

			console.log(
				"\n=====================\nDB initialization complete!\n=====================\n"
			);
		} catch (error) {
			console.log(error.message);
		}
	},
};
