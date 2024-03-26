const express = require("express");
const router = express.Router();
const {
	createUser,
	getLogin,
	initiateResetPassword,
	confirmResetPassword,
	changePassword,
	getLogout,
} = require("../controllers/authController");
const {
	systemAdminAccessCheck,
	checkLogin,
} = require("../middlewares/authMiddleware");

router.post("/create", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const user = req.body;

		const result = await createUser({
			email: user.email,
			password: user.password,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = req.body;

		const result = await getLogin({
			emailOrMobileNumber: user.emailOrMobileNumber,
			password: user.password,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.get("/logout", checkLogin, async (req, res) => {
	try {
		const userId = req.userId;

		const result = await getLogout({
			userId: userId,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.post("/reset-password/initiate", async (req, res) => {
	try {
		const user = req.body;

		const result = await initiateResetPassword({
			email: user.email,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.post("/reset-password/confirm", async (req, res) => {
	try {
		const user = req.body;

		const result = await confirmResetPassword({
			email: user.email,
			code: user.code,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.post("/change-password", checkLogin, async (req, res) => {
	try {
		const { newPassword } = req.body;
		const userId = req.userId;

		const result = await changePassword({
			userId: userId,
			newPassword: newPassword,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

module.exports = router;
