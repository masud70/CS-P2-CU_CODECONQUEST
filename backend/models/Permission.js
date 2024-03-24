module.exports = (sequelize, DataTypes) => {
	const Permission = sequelize.define("Permission", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});

	return Permission;
};
