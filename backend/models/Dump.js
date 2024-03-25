module.exports = (sequelize, DataTypes) => {
	const Dump = sequelize.define("Dump", {
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
			type: DataTypes.STRING,
			allowNull: false,
		},
		departure: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Dump;
};
