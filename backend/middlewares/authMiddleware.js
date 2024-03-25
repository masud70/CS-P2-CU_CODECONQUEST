const jwt = require("jsonwebtoken");
const db = require("../models");
module.exports = {
	checkLogin: async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			const token = authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const { email, userId } = decoded;

			const user = await db.User.findByPk(userId);

			if (user.loginStatus === true) {
				req.userId = userId;
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
			const { email, userId } = decoded;

			const user = await db.User.findByPk(userId);
			const userRoles = await user.getRoles();

			const roles = userRoles.map((role) => role.title);
			const isSysAdmin = roles.find((item) => item === "system_admin");

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = userId;
				req.email = email;
				req.role = user.role;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},
};
