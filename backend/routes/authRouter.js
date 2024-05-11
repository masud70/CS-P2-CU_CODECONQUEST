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
const { validateCaptcha } = require("../middlewares");

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

// For user login
router.post("/login", validateCaptcha, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await getLogin(data);

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

// For user login
router.post("/mobile-login", async (req, res, next) => {
	try {
		const data = req.body;

		const result = await getLogin(data);

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

// For user logout
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
			emailOrMobileNumber: user.emailOrMobileNumber,
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
			emailOrMobileNumber: user.emailOrMobileNumber,
			code: user.code,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.post(
	"/change-password",
	validateCaptcha,
	checkLogin,
	async (req, res) => {
		try {
			const { oldPassword, newPassword } = req.body;
			const userId = req.userId;

			const result = await changePassword({
				userId,
				oldPassword,
				newPassword,
			});

			res.json(result);
		} catch (error) {
			next(error.messsage);
		}
	}
);

module.exports = router;
