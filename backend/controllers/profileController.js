const db = require("../models");

module.exports = {
	getUserData: async ({ user_id }) => {
		try {
			const user = await db.User.findByPk(user_id);

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

	updateUserData: async ({ user_id, data }) => {
		try {
			const user = await db.User.findByPk(user_id);
			if (user) {
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
};
