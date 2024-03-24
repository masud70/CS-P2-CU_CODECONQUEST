const Roles = require("../constants");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.TEXT,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.TEXT,
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
