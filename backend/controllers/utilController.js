const { getDistanceAndDuration } = require("../helper");
const db = require("../models");

module.exports = {
	computeBill: async ({
		origin,
		volumeOfWaste,
		regNumber,
		loaded,
		destination = { lat: 23.7816358, lng: 90.3345173 },
	}) => {
		try {
			const vehicle = await db.Vehicle.findOne({
				where: { regNumber },
			});
			if (!vehicle) {
				throw new Error(
					`Couldn't find vehicle with regNumber: ${regNumber}`
				);
			}

			const dd = await getDistanceAndDuration({ origin, destination });

			if (!dd.success) {
				throw new Error("Could not find route distance!");
			}

			const extraCostPerTon =
				Math.max(
					vehicle.costPerKiloLoaded - vehicle.costPerKiloUnLoaded,
					0
				) / vehicle.capacity;

			var totalCost =
				dd.distance *
				(loaded
					? vehicle.costPerKiloLoaded
					: vehicle.costPerKiloUnLoaded);

			totalCost =
				totalCost -
				(loaded
					? extraCostPerTon *
					  Math.max(vehicle.capacity - volumeOfWaste, 0)
					: 0);

			return {
				success: true,
				message: "Bill computed successfully!",
				vehicleId: vehicle.id,
				regNumber: vehicle.regNumber,
				totalCost: totalCost,
				origin: origin,
				destination: destination,
				volumeOfWaste: volumeOfWaste,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},
};
