const jwt = require("jsonwebtoken");
const db = require("../models");
module.exports = {
	checkAuthToken: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			const token = authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { email, user_id } = decoded;

			const user = await db.User.findByPk(user_id);

			if (user.loginStatus == true) {
				req.user_id = user.id;
				next();
			} else {
				throw new Error("User logged out!");
			}
		} catch (error) {
			next(error.message);
		}
	},
};
