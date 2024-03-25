const db = require("../models");

module.exports = {
	getUserData: async ({ userId }) => {
		try {
			const user = await db.User.findByPk(userId);

			return {
				success: true,
				user: user,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	updateUserData: async ({ userId, data }) => {
		try {
			const user = await db.User.findByPk(userId);
			if (user) {
				if (data.name) user.name = data.name;
				if (data.avatar) user.avatar = data.avatar;

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
				error: error.message,
			};
		}
	},
};
