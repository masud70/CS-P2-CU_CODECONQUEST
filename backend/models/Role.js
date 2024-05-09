module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define("Role", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        roleString: {
            type: DataTypes.STRING,
			allowNull: false,
        }
	});

	return Role;
};
