module.exports = (sequelize, DataTypes) => {
	const EmployeeWorkLog = sequelize.define("EmployeeWorkLog", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		date: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		// We don't need this data as we are tracking in real-time
		// totalHoursWorked: {
		// 	type: DataTypes.DOUBLE,
		// 	allowNull: false,
		// },
		overtimeHours: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		absent: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		leave: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return EmployeeWorkLog;
};
