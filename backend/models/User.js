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
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		mobileNumber: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.TEXT,
		},
		dob: {
			type: DataTypes.BIGINT,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		loginStatus: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	});

	return User;
};
