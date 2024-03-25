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
		capacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 3,
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
