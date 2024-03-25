module.exports = (sequelize, DataTypes) => {
	const Otp = sequelize.define("Otp", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		generatedAt: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		validFor: {
			type: DataTypes.INTEGER,
            defaultValue: 5
		},
	});

	return Otp;
};
