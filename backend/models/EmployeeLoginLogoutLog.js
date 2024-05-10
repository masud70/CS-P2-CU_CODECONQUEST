module.exports = (sequelize, DataTypes) => {
	const EmployeeLoginLogoutLog = sequelize.define("EmployeeLoginLogoutLog", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		loginTime: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		logoutTime: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		time: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	});

	return EmployeeLoginLogoutLog;
};
