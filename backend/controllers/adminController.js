const { Capacity, VehicleType } = require("../constants");
const db = require("../models");

module.exports = {
	addVehicle: async ({
		regNumber,
		type,
		capacity,
		costPerKiloLoaded,
		costPerKiloUnLoaded,
	}) => {
		try {
			const capacities = Object.values(Capacity);
			const types = Object.values(VehicleType);

			const isValidCapacity = capacities.find((c) => c === capacity);
			const isValidVehicleType = types.find((t) => t === type);

			if (!isValidCapacity) {
				throw new Error("Invalid capacity!");
			} else if (!isValidVehicleType) {
				throw new Error("Invalid truck type!");
			}

			const vehicle = await db.Vehicle.create({
				regNumber,
				type,
				capacity,
				costPerKiloLoaded,
				costPerKiloUnLoaded,
			});

			return {
				success: true,
				message: "Vehicle created successfully!",
				vehicle: vehicle,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	addSts: async ({ wardNumber, capacity, lat, long }) => {
		try {
			const sts = await db.Sts.create({
				wardNumber,
				capacity,
				lat,
				long,
			});

			return {
				success: true,
				message: "STS created successfully!",
				sts: sts,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	assignStsManager: async ({ stsId, managerId }) => {
		try {
			const sts = await db.Sts.findByPk(stsId);
			const manager = await db.User.findOne({
				where: { id: managerId },
				include: [
					{
						model: Role,
						where: {
							title: "sts_manager",
						},
					},
				],
			});

			if (!sts) {
				throw new Error("Invalid STS ID!");
			} else if (!manager) {
				throw new Error(
					`STS manager could not found with ID ${managerId}`
				);
			}

			await db.Sts.addUser(manager);

			return {
				success: true,
				message: "STS manager added successfully!",
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	addDeparture: async ({
		stsId,
		vehicleNumber,
		volumeOfWaste,
		arrival,
		departure,
	}) => {
		try {
			const sts = db.Sts.findByPk(stsId);
			const vehicle = db.Vehicle.findOne({
				where: { regNumber: vehicleNumber },
			});

			const departured = db.StsDeparture.create({
				volumeOfWaste,
				arrival,
				departure,
				StsId: sts.id,
				VehicleId: vehicle.id,
			});

			return {
				success: true,
				message: "Departure entry added successfully!",
				departure: departured,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	addDump: async ({ volumeOfWaste, arrival, departure }) => {
		try {
			const dump = await db.Dump.create({
				volumeOfWaste,
				arrival,
				departure,
			});

			return {
				success: true,
				message: "Dump inserted successfully!",
				dump: dump,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
