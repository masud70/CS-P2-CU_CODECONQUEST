module.exports = (sequelize, DataTypes) => {
	const Manager = sequelize.define("Manager", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		managerType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Manager;
};
