const express = require("express");
const {
	systemAdminAccessCheck,
	stsManagerAccessCheck,
	landfillManagerAccessCheck,
} = require("../middlewares/authMiddleware");
const {
	addVehicle,
	addSts,
	assignStsManager,
	addDeparture,
	addDump,
} = require("../controllers/adminController");
const router = express.Router();

router.post("/add-vehicle", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addVehicle(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/add-sts", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addSts(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post(
	"/assign-sts-manager",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;

			const result = await assignStsManager(data);

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

router.post("/add-departure", stsManagerAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addDeparture(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/add-dump", landfillManagerAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addDump({ ...data, managerId: req.userId });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
