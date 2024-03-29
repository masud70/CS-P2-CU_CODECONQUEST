const { getDistanceAndDuration } = require("../helper");
const db = require("../models");

module.exports = {
	computeBill: async ({ dumpEntryId }) => {
		try {
			const dumpEntry = await db.DumpEntry.findOne({
				where: { id: dumpEntryId },
				include: [
					{ model: db.User },
					{ model: db.Vehicle, include: db.Sts },
                    {model: db.Landfill}
				],
			});
			
            const sts = dumpEntry.Vehicle.St;
            const landfill = dumpEntry.Landfill;
            const vehicle = dumpEntry.Vehicle;
			const origin = { lat: sts.lat, lng: sts.lng };
			const destination = { lat: landfill.lat, lng: landfill.lng };

			const dd = await getDistanceAndDuration({ origin, destination });

			if (!dd.success) {
				throw new Error("Could not find route distance!");
			}

			var totalCost =
				dd.distance *
				(vehicle.costPerKiloUnLoaded +
					(3 / 5) *
						(vehicle.costPerKiloLoaded -
							vehicle.costPerKiloUnLoaded));

			return {
				success: true,
				message: "Bill computed successfully!",
				vehicle: vehicle,
				origin: sts,
				destination: landfill,
				totalCost: totalCost,
				weightOfWaste: dumpEntry.weightOfWaste,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};