const db = require("../models");

module.exports = {
	getAvailabeVehicle: async ({ stsId }) => {
		try {
			const sts = await db.Sts.findOne({
				where: { id: stsId },
				include: db.Vehicle,
			});

			return {
				success: true,
				vehicles: sts.Vehicles,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getUnassignedVehicles: async () => {
		try {
			const vehicles = await db.Vehicle.findAll({
				where: { StId: null },
			});

			return {
				success: true,
				vehicles: vehicles,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getAllSts: async () => {
		try {
			const sts = await db.Sts.findAll();

			return {
				success: true,
				sts: sts,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getManagers: async ({ title }) => {
		try {
			const managers = await db.User.findAll({
				include: [
					{
						model: db.Role,
						where: { title },
					},
				],
			});

			return {
				success: true,
				managers: managers,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getAllLandfill: async () => {
		try {
			const landfills = await db.Landfill.findAll();

			return {
				success: true,
				landfills: landfills,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	getAvailableVehicle: async ({ stsId }) => {
		try {
			const vehicles = await db.Vehicle.findAll({
				where: { StId: stsId },
			});

			return {
				success: true,
				vehicles: vehicles,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
