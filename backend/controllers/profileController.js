const db = require("../models");

module.exports = {
	getUserData: async ({ userId }) => {
		try {
			const user = await db.User.findOne({
				where: { id: userId },
				include: db.Role,
			});

			const userData = {
				id: user.id,
				name: user.name,
				email: user.email,
				mobileNumber: user.mobileNumber,
				role: user.Roles[0].roleString,
			};

			return {
				success: true,
				user: userData,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	updateUserData: async ({ userId, field, value }) => {
		try {
			const allowed = ["name", "mobileNumber", "avatar"];

			if (!allowed.includes(field)) {
				throw new Error(
					"You don't have permission to update this value!"
				);
			}

			const user = await db.User.findByPk(userId);
			if (!user) {
				throw new Error(`User with ${userId} not found!`);
			}

			user[field] = value;
			await user.save();
            
			const updateUser = await db.User.findByPk(userId);

			return {
				success: true,
				message: "Update successful!",
				user: updateUser,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
