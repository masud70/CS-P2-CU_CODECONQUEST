const express = require("express");
const { checkLogin } = require("../middlewares/authMiddleware");
const {
	getUserData,
	updateUserData,
} = require("../controllers/profileController");
const router = express.Router();

router.get("/", checkLogin, async (req, res, next) => {
	try {
		const result = await getUserData({ userId: req.userId });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.put("/", checkLogin, async (req, res, next) => {
	try {
		const data = req.body;
		const result = await updateUserData({
			userId: req.userId,
			...data,
		});

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
