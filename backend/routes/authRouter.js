const express = require("express");
const {
	createUser,
	getLogin,
	initiateResetPassword,
	confirmResetPassword,
	changePassword,
} = require("../controllers/userController");
const { checkAuthToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", async (req, res, next) => {
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
			email: user.email,
			password: user.password,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.get("/logout", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
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

router.post("/change-password", checkAuthToken, async (req, res) => {
	try {
		const user = req.body;
		const user_id = req.user_id;

		const result = await changePassword({
			user_id: user_id,
			newPassword: user.newPassword,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

module.exports = router;
