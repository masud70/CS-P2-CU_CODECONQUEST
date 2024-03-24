const jwt = require("jsonwebtoken");
const db = require("../models");
const Roles = require("../constants");
module.exports = {
	checkLogin: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			const token = authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { email, user_id } = decoded;

			const user = await db.User.findByPk(user_id);

			if (user.loginStatus === true) {
				req.user_id = user_id;
				req.email = email;
				req.role = user.role;
				next();
			} else {
				throw new Error("User logged out!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	systemAdminAccessCheck: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			const token = authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { email, user_id } = decoded;

			const user = await db.User.findByPk(user_id);

			if (user.loginStatus === true && user.role === Roles.SYSTEM_ADMIN) {
				req.user_id = user_id;
				req.email = email;
				req.role = user.role;
				next();
			} else {
				throw new Error("Invalid access!");
			}
		} catch (error) {
			next(error.message);
		}
	},
};
