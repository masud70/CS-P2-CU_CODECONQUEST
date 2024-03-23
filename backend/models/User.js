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
				"system_admin",
				"sts_manager",
				"landfill_manager",
				"unassigned"
			),
			defaultValue: "unassigned",
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
