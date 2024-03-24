const express = require("express");
const { checkLogin } = require("../middlewares/authMiddleware");
const {
	getUserData,
	updateUserData,
} = require("../controllers/profileController");
const router = express.Router();

router.get("/", checkLogin, async (req, res, next) => {
	try {
		const result = await getUserData({ user_id: req.user_id });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});
router.put("/", checkLogin, async (req, res, next) => {
	try {
		const data = req.body;
		const result = await updateUserData({
			user_id: req.user_id,
			data: data,
		});

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
