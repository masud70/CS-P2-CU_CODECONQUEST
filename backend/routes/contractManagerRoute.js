const express = require("express");
const {
	employeeRegister,
} = require("../controllers/contractorManagerController");
const {
	contractorManagerAccessCheck,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
	"/employee-register",
	contractorManagerAccessCheck,
	async (req, res, next) => {
		try {
			const user = req.body;
			const result = await employeeRegister({
				...user,
				ContractorId: req.contractorId,
			});

			res.json(result);
		} catch (error) {
			next(error.messsage);
		}
	}
);

module.exports = router;
