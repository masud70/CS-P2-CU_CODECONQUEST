const bcrypt = require("bcrypt");
const { getRandomChars, sendMail, generateToken } = require("../helper");
const db = require("../models");
const { where } = require("sequelize");
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
					const role = await db.Role.findOne({
						where: { title: "unassigned" },
					});
					await db.UserRole.create({
						UserId: createUser.id,
						RoleId: role.id,
					});

					const body = {
						text: "",
						html: `<p>An admin has created a new account for you. Below is your account credentials.</p><h2>Email: ${email} <br>Password: ${password}</h2>`,
					};

					const emailResult = await sendMail({
						email: email,
						body: body,
					});

					if (emailResult.success) {
						return {
							success: true,
							message:
								"Registration successfully! Ask the user to check their email.",
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

	getLogin: async ({ emailOrMobileNumber, password }) => {
		try {
			const email = emailOrMobileNumber.includes("@")
				? emailOrMobileNumber
				: null;
			const mobileNumber = !emailOrMobileNumber.includes("@")
				? emailOrMobileNumber
				: null;

			const where = {
				[email ? "email" : "mobileNumber"]: email || mobileNumber,
			};

			const user = await db.User.findOne({ where });
			if (user) {
				const isValidPassword = await bcrypt.compare(
					password,
					user.password
				);

				if (isValidPassword) {
					user.loginStatus = true;
					await user.save();

					const token = generateToken({
						userId: user.id,
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
				const errorMessage = email
					? `User with email ${email} not found`
					: `User with mobile number ${mobileNumber} not found`;
				throw new Error(errorMessage);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	getLogout: async ({ userId }) => {
		try {
			const user = await db.User.findByPk(userId);
			if (user) {
				user.loginStatus = false;
				await user.save();

				return {
					success: true,
					message: "Logout successful!",
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

	initiateResetPassword: async ({ email, validFor = 5 }) => {
		try {
			const code = getRandomChars(6);
			const user = await db.User.findOne({ where: { email: email } });

			if (user) {
				const otp = await db.Otp.create({
					code: code,
					generatedAt: Date.now(),
					validFor,
				});
				await user.addOtp(otp);

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
							"An email is sent with your password recovery code. Please check your inbox.",
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
				where: { email: email },
				include: [
					{
						model: db.Otp,
						where: {
							code: code,
						},
					},
				],
			});

			const notExpired = user.Otps[0].generatedAt + 300000 >= Date.now();

			if (user && notExpired) {
				user.loginStatus = true;
				await user.save();

				await db.Otp.destroy({ where: { id: user.Otps[0].id } });

				const token = generateToken({
					email: email,
					userId: user.id,
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

	changePassword: async ({ userId, newPassword }) => {
		try {
			const user = await db.User.findByPk(userId);

			if (user) {
				user.password = await bcrypt.hash(newPassword, saltRounds);
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
