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
	addVehiclesTosts,
	addLandfill,
	assignLandfillManager,
	addDumpEntry,
	contractorRegister,
    contractorManagerRegister,
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

router.put(
	"/assign-vehicle-to-sts",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;

			const result = await addVehiclesTosts(data);

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

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

router.post("/add-landfill", systemAdminAccessCheck, async (req, res, next) => {
	try {
		const data = req.body;

		const result = await addLandfill(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post(
	"/assign-landfill-manager",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;

			const result = await assignLandfillManager(data);

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

router.post(
	"/add-dump-entry",
	landfillManagerAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;

			const result = await addDumpEntry({
				...data,
				managerId: req.userId,
			});

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

router.post(
	"/contractor-register",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;

			const result = await contractorRegister(data);

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

router.post(
	"/contractor-manager-register",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const data = req.body;
			const result = await contractorManagerRegister(data);

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);


module.exports = router;
