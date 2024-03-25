module.exports = (sequelize, DataTypes) => {
	const StsDeparture = sequelize.define("StsDeparture", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		volumeOfWaste: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		arrival: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		departure: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});

	return StsDeparture;
};
