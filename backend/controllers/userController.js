const Roles = require("../constants");
const db = require("../models");

module.exports = {
	getAllUsers: async () => {
		try {
			const users = await db.User.findAll();
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

	updateUser: async ({ userId, data, role }) => {
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
				throw new Error(`User with ${userId} not found!`);
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
