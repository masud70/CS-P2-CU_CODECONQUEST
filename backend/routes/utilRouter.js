const express = require("express");
const { computeBill } = require("../controllers/utilController");
const router = express.Router();
const geoip = require("geoip-lite");

router.get("/bill/:dumpEntryId", async (req, res, next) => {
	try {
		const data = req.params;
		// if (!data.origin) {
		// 	const geo = geoip.lookup('103.127.3.170');
		// 	data.origin = { lat: geo.ll[0], lng: geo.ll[1] };
		// }

		const result = await computeBill(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

module.exports = router;
