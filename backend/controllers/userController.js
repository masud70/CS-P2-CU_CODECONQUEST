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
				error: error.message,
			};
		}
	},

	getUserById: async ({ user_id }) => {
		try {
			const user = await db.User.findByPk(user_id);
			if (user) {
				return {
					success: true,
					user: user,
				};
			} else {
				throw new Error(`User with ${user_id} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	updateUser: async ({ user_id, data, role }) => {
		try {
			const user = await db.User.findByPk(user_id);
			if (user) {
				if (data.role && role === Roles.SYSTEM_ADMIN)
					user.role = data.role;
				if (data.user_name) user.user_name = data.user_name;

				await user.save();
				const updateUser = await db.User.findByPk(user_id);

				return {
					success: true,
					message: "Update successful!",
					user: updateUser,
				};
			} else {
				throw new Error(`User with ${user_id} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	deleteUser: async ({ user_id }) => {
		try {
			const deleteCount = await db.User.destroy({
				where: { user_id: user_id },
			});
			console.log("Deleted: ", deleteCount);
			if (deleteCount) {
				return {
					success: true,
					message: "User deleted successfully!",
				};
			} else {
				throw new Error(`User with ${user_id} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
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

	updateRole: async ({ user_id, role }) => {
		try {
			const rolesArray = Object.values(Roles);
			const user = await db.User.findByPk(user_id);

			if (!rolesArray.find((item) => item === role)) {
				throw new Error("Invalid role!");
			}

			if (user) {
				user.role = role;
				await user.save();
				return {
					success: true,
					message: "User role updated successfully!",
				};
			} else {
				throw new Error(`User with ${user_id} not found!`);
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},
};
