module.exports = (sequelize, DataTypes) => {
	const Landfill = sequelize.define("Landfill", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		locationName: {
			type: DataTypes.STRING,
		},
		startingYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		operationalTimespan: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lat: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		lng: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	});

	return Landfill;
};
