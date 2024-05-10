const jwt = require("jsonwebtoken");
const db = require("../models");
const { checkCommonElements } = require("../helper");

module.exports = {
	decodeToken: async ({ authorization }) => {
		if (!authorization) {
			throw new Error("Authorization token error!");
		}
		const token = authorization.split(" ")[1];
		const { email, userId } = jwt.verify(token, process.env.JWT_SECRET);

		const user = await db.User.findByPk(userId);
		const userRoles = await user.getRoles();
		const roles = userRoles.map((role) => role.title);

		return { ...user.dataValues, roles: roles };
	},

	checkLogin: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			if (user.loginStatus === true) {
				req.userId = user.id;
				req.email = user.email;
				req.role = user.roles;
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
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "system_admin"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	stsManagerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "sts_manager"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	landfillManagerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isSysAdmin = user.roles.find(
				(item) => item === "landfill_manager"
			);

			if (user.loginStatus === true && isSysAdmin) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},

	managerAccessCheck: async (req, res, next) => {
		try {
			const user = await module.exports.decodeToken(req.headers);

			const isManager = checkCommonElements(user.roles, [
				"system_admin",
				"sts_manager",
				"landfill_manager",
			]);

			if (user.loginStatus === true && isManager) {
				req.userId = user.id;
				req.email = user.email;
				req.roles = user.roles;
				next();
			} else {
				throw new Error("Access denied!");
			}
		} catch (error) {
			next(error.message);
		}
	},
};
