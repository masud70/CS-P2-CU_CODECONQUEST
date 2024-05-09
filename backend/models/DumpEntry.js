module.exports = (sequelize, DataTypes) => {
	const DumpEntry = sequelize.define("DumpEntry", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		weightOfWaste: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		arrival: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		departure: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        billStatus:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
	});

	return DumpEntry;
};
