module.exports = (sequelize, DataTypes) => {
	const EmployeeActivityLog = sequelize.define("EmployeeActivityLog", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		activityStatus: {
			type: DataTypes.STRING,
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
		time: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});

	return EmployeeActivityLog;
};
