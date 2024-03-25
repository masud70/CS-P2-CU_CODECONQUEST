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
						model: db.Role,
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

			await sts.setUser(manager);

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
			const sts = await db.Sts.findByPk(stsId);
			const vehicle = await db.Vehicle.findOne({
				where: { regNumber: vehicleNumber },
			});

			const departured = await db.StsDeparture.create({
				volumeOfWaste,
				arrival,
				departure,
				StId: sts.id,
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

	addDump: async ({
		managerId,
		vehicleNumber,
		volumeOfWaste,
		arrival,
		departure,
	}) => {
		try {
			const manager = await db.User.findByPk(managerId);
			const vehicle = await db.Vehicle.findOne({
				where: { regNumber: vehicleNumber },
			});

			const dump = await db.Dump.create({
				volumeOfWaste,
				arrival,
				departure,
			});

			await manager.addDump(dump);
			await vehicle.addDump(dump);
			const updatedDump = await db.Dump.findByPk(dump.id);

			return {
				success: true,
				message: "Dump inserted successfully!",
				dump: updatedDump,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
