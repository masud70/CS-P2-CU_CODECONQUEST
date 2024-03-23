const express = require("express");
const { createUser } = require("../controllers/userController");
const router = express.Router();

router.post("/create", async (req, res, next) => {
	try {
		const user = req.body;

		const result = await createUser({ email: user.email });

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.get("/login", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
});

router.get("/logout", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
});

router.get("/reset-password/initiate", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
});

router.get("/reset-password/confirm", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
});

router.get("/change-password", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
});

module.exports = router;
