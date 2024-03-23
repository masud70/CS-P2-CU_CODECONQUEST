const express = require("express");
const router = express.Router();

router.get("/create", (req, res) => {
	res.json({ status: true, messsage: "Hello world!" });
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
