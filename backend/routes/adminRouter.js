const express = require("express");
const { systemAdminAccessCheck } = require("../middlewares/authMiddleware");
const { addVehicle } = require("../controllers/adminController");
const router = express.Router();

router.post("/", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addVehicle(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addVehicle(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
