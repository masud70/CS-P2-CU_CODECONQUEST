module.exports = (sequelize, DataTypes) => {
	const StsEntry = sequelize.define("StsEntry", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		weightOfWaste: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		dateAndTime: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		typeOfWaste: {
			type: DataTypes.STRING,
			defaultValue: false,
		},
		vehicleId: {
			type: DataTypes.STRING,
            allowNull: false,
		},
	});

	return StsEntry;
};
