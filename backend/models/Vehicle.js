module.exports = (sequelize, DataTypes) => {
	const Vehicle = sequelize.define("Vehicle", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		regNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		costPerKiloLoaded: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		costPerKiloUnLoaded: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	});

	return Vehicle;
};
