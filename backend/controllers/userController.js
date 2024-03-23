const bcrypt = require("bcrypt");
const { getRandomChars, sendMail, generateToken } = require("../helper");
const db = require("../models");
const saltRounds = 10;

module.exports = {
	createUser: async ({ email, password }) => {
		try {
			if (!password) password = getRandomChars(6);

			const user = await db.User.findAll({ where: { email: email } });

			if (user.length == 0) {
				const hashedPassword = await bcrypt.hash(password, saltRounds);

				const createUser = await db.User.create({
					email: email,
					password: hashedPassword,
				});

				if (createUser) {
					const body = {
						text: "",
						html: `<p>An admin has created a new account for you. Below is your account credentials.</p><h2>Email: ${email} <br>Password: ${password}</h2>`,
					};

					const emailResult = await sendMail({
						email: email,
						body: body,
					});
					console.log(emailResult);

					if (emailResult.success) {
						return {
							success: true,
							message:
								"User created successfully! Ask the user to check email.",
						};
					} else {
						await createUser.destroy();
						throw new Error(emailResult.message);
					}
				} else {
					throw new Error("User creation failed!");
				}
			} else {
				throw new Error("User already exists!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	getLogin: async ({ email, password }) => {
		try {
			const user = await db.User.findOne({ where: { email: email } });
			if (user) {
				const isValidPassword = await bcrypt.compare(
					password,
					user.password
				);

				if (isValidPassword) {
					user.loginStatus = true;
					await user.save();

					const token = generateToken({
						user_id: user.user_id,
						email: email,
					});
					return {
						success: true,
						message: "Login successful!",
						token: token,
					};
				} else {
					throw new Error("Authentication failed!");
				}
			} else {
				throw new Error(`User ${email} not found`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	getLogout: async ({ user_id }) => {
		try {
			const user = await db.User.findByPk(user_id);
			if (user) {
				user.loginStatus = false;
				await user.save();

				return {
					success: true,
					message: "Logout successful!",
					token: token,
				};
			} else {
				throw new Error(`User not found`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	initiateResetPassword: async ({ email }) => {
		try {
			const code = getRandomChars(6);
			const user = await db.User.findOne({ where: { email: email } });

			if (user) {
				user.passwordResetCode = code;
				await user.save();

				const emailBody = {
					text: "",
					html: `Your password recovery code is: <h2>${code}</h2>`,
				};

				const result = await sendMail({
					email: email,
					body: emailBody,
				});

				if (result.success) {
					return {
						success: true,
						message:
							"An email is sent with your password recovery code.",
					};
				} else {
					throw new Error(emailResult.message);
				}
			} else {
				throw new Error("User not found!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	confirmResetPassword: async ({ email, code }) => {
		try {
			const user = await db.User.findOne({
				where: { email: email, passwordResetCode: code },
			});

			if (user) {
				user.loginStatus = true;
				await user.save();

				const token = generateToken({
					email: email,
					user_id: user.user_id,
				});
				return {
					success: true,
					message: "Correct password reset code!",
					token: token,
				};
			} else {
				throw new Error("Invalid email or code!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	changePassword: async ({ user_id, newPassword }) => {
		try {
			const user = await db.User.findByPk(user_id);

			if (user) {
				user.password = await bcrypt.hash(newPassword, saltRounds);
				user.passwordResetCode = getRandomChars(5);
				await user.save();

				return {
					success: true,
					message: "Password changed successfully!",
				};
			} else {
				throw new Error("User not found!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},
};
