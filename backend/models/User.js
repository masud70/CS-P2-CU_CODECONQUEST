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
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return User;
};
