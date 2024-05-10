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

	addSts: async ({ wardNumber, capacity, locationName, lat, lng }) => {
		try {
			const sts = await db.Sts.create({
				wardNumber,
				capacity,
				locationName,
				lat,
				lng,
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

	assignStsManager: async ({ stsId, managerIds }) => {
		try {
			const sts = await db.Sts.findByPk(stsId);
			const managers = await db.User.findAll({
				where: { id: managerIds },
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
			} else if (!managers || managers.length < managerIds.length) {
				throw new Error(
					`All the STS managers could not found with given IDs`
				);
			}

			await sts.addUsers(managers);
			const updatedSts = await db.Sts.findOne({
				where: { id: stsId },
				include: db.User,
			});

			return {
				success: true,
				message: "STS manager(s) added successfully!",
				sts: updatedSts,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	addVehiclesTosts: async ({ stsId, vehicleIds }) => {
		try {
			const sts = await db.Sts.findByPk(stsId);

			const vehicles = await db.Vehicle.findAll({
				where: { id: vehicleIds, StId: null },
			});

			if (vehicles.length == 0) {
				throw new Error(
					"All the vehicle with given IDs are assigned already."
				);
			}
			if (vehicleIds.length > vehicles.length) {
				throw new Error(
					"Some vehicles are already assigned to some vehicle(s)."
				);
			}
			if (!sts) {
				throw new Error("Invalid STS ID!");
			} else if (!vehicles) {
				throw new Error(`No vehicle found with given IDs.`);
			}

			await sts.addVehicles(vehicles);

			const updatedSts = await db.Sts.findOne({
				where: { id: stsId },
				include: db.Vehicle,
			});

			return {
				success: true,
				message: "Vehicles added to STS successfully!",
				sts: updatedSts,
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
		regNumber,
		weightOfWaste,
		arrival,
		departure,
	}) => {
		try {
			const sts = await db.Sts.findByPk(stsId);
			const vehicle = await db.Vehicle.findOne({
				where: { regNumber: regNumber },
			});

			if (!sts) {
				throw new Error(`Sts could not find with ID ${stsId}`);
			}
			if (!vehicle) {
				throw new Error(
					"Vehicle not found with regNumber " + regNumber
				);
			}

			const departured = await db.StsDeparture.create({
				weightOfWaste,
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

	addLandfill: async ({
		capacity,
		startingYear,
		operationalTimespan,
		lat,
		lng,
	}) => {
		try {
			const landfill = await db.Landfill.create({
				capacity,
				startingYear,
				operationalTimespan,
				lat,
				lng,
			});

			if (!landfill) {
				throw new Error("Landfill site could not create!");
			}

			return {
				success: true,
				message: "Landfill site created successfully!",
				landfill: landfill,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	assignLandfillManager: async ({ landfillId, managerIds }) => {
		try {
			const landfill = await db.Sts.findByPk(landfillId);
			const managers = await db.User.findAll({
				where: { id: managerIds },
				include: [
					{
						model: db.Role,
						where: {
							title: "landfill_manager",
						},
					},
				],
			});

			if (!landfill) {
				throw new Error("Invalid Landfill ID!");
			} else if (!managers || managers.length < managerIds.length) {
				throw new Error(
					`All the Landfill managers could not found with given IDs`
				);
			}

			await landfill.addUsers(managers);
			const updatedLandfill = await db.Landfill.findOne({
				where: { id: landfillId },
				include: db.User,
			});

			return {
				success: true,
				message: "Landfill manager(s) added successfully!",
				landfill: updatedLandfill,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	addDumpEntry: async ({
		managerId,
		vehicleNumber,
		weightOfWaste,
		arrival,
		departure,
		landfillId,
	}) => {
		try {
			const manager = await db.User.findByPk(managerId);
			const landfill = await db.Landfill.findByPk(landfillId);
			const vehicle = await db.Vehicle.findOne({
				where: { regNumber: vehicleNumber },
			});
			if (!vehicle) {
				throw new Error("Vehicle not found!");
			}
			if (!landfill) {
				throw new Error("Landfill not found!");
			}

			const dumpEntry = await db.DumpEntry.create({
				weightOfWaste,
				arrival,
				departure,
			});

			await manager.addDumpEntry(dumpEntry);
			await vehicle.addDumpEntry(dumpEntry);
			await landfill.addDumpEntry(dumpEntry);
			const updatedDumpEntry = await db.DumpEntry.findByPk(dumpEntry.id);

			return {
				success: true,
				message: "Dump entry inserted successfully!",
				dumped: updatedDumpEntry,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},

	contractorRegister: async (data) => {
		try {
			const contractor = await db.Contractor.create(data);
			if (!contractor) {
				throw new Error("Contractor could not be created!");
			}

			return {
				success: true,
				message: "Contractor registered successfully!",
				contractor: contractor,
			};
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
