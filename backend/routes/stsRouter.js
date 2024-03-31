const express = require("express");
const {
	getAvailabeVehicle,
	getAllSts,
	getAllLandfill,
	getManagers,
	getUnassignedVehicles,
	getAvailableVehicle,
} = require("../controllers/stsController");
const router = express.Router();

router.get("/available-vehicle/:stsId", async (req, res, next) => {
	try {
		const data = req.params;

		const result = await getAvailabeVehicle(data);

		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/unassigned-vehicles", async (req, res, next) => {
	try {
		const result = await getUnassignedVehicles();

		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/managers/:title", async (req, res, next) => {
	try {
		const data = req.params;

		const result = await getManagers(data);

		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/all-sts", async (req, res, next) => {
	try {
		const result = await getAllSts();

		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/all-landfills", async (req, res, next) => {
	try {
		const result = await getAllLandfill();

		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/available-vehicle/:stsId", async (req, res, next) => {
	try {
		const stsId = req.params.stsId;
		const result = await getAvailabeVehicle({ stsId });
		res.json(result);
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;
