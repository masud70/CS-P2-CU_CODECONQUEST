module.exports = (sequelize, DataTypes) => {
	const Sts = sequelize.define("Sts", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		wardNumber: {
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
		long: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
	});

	return Sts;
};
