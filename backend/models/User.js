const Roles = require("../constants");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		user_name: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM(
				Roles.SYSTEM_ADMIN,
				Roles.STS_MANAGER,
				Roles.LANDFILL_MANAGER,
				Roles.UNASSIGNED
			),
			defaultValue: Roles.UNASSIGNED,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		passwordResetCode: {
			type: DataTypes.TEXT,
		},
		loginStatus: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return User;
};
