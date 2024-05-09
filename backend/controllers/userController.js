const Roles = require("../constants");
const bcrypt = require("bcryptjs");
const { getRandomChars, sendMail } = require("../helper");
const db = require("../models");
const saltRounds = 10;

module.exports = {
	createUser: async ({ email, password }) => {
		try {
			if (!password) password = getRandomChars(6);
			if (!email) {
				throw new Error("Email cannot be empty!");
			}

			const user = await db.User.findAll({ where: { email: email } });

			if (user.length == 0) {
				const hashedPassword = await bcrypt.hash(password, saltRounds);

				const createdUser = await db.User.create({
					email: email,
					password: hashedPassword,
				});

				if (createdUser) {
					const role = await db.Role.findOne({
						where: { title: "unassigned" },
					});
					await db.UserRole.create({
						UserId: createdUser.id,
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
						await createdUser.destroy();
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
				message: error.message,
			};
		}
	},

	getAllUsers: async () => {
		try {
			const users = await db.User.findAll({ include: db.Role });
			return {
				success: true,
				users: users,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getUserById: async ({ userId }) => {
		try {
			const user = await db.User.findByPk(userId);
			if (user) {
				return {
					success: true,
					user: user,
				};
			} else {
				throw new Error(`User with ${userId} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	updateUser: async ({ userId, data }) => {
		try {
			const user = await db.User.findByPk(userId);
			if (user) {
				if (data.name) user.name = data.name;

				await user.save();
				const updateUser = await db.User.findByPk(userId);

				return {
					success: true,
					message: "Update successful!",
					user: updateUser,
				};
			} else {
				throw new Error(`User with ${userId} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	deleteUser: async ({ userId }) => {
		try {
			const deleteCount = await db.User.destroy({
				where: { id: userId },
			});

			if (deleteCount) {
				return {
					success: true,
					message: "User deleted successfully!",
				};
			} else {
				throw new Error(`User with id ${userId} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getAllAvailableRoles: () => {
		const rolesArray = Object.values(Roles);
		return {
			success: true,
			available_roles: rolesArray,
		};
	},

	updateRole: async ({ userId, role }) => {
		try {
			const user = await db.User.findByPk(userId);
			const roleInstance = await db.Role.findOne({
				where: { title: role },
			});

			if (!roleInstance) {
				throw new Error("Invalid role!");
			}

			if (user) {
				await db.UserRole.destroy({ where: { UserId: user.id } });
				await user.addRole(roleInstance);

				return {
					success: true,
					message: "User role updated successfully!",
				};
			} else {
				throw new Error(`User with ${userId} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
