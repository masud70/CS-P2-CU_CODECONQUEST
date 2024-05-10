module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define("Employee", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		employeeId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		dateOfHire: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		jobTitle: {
			type: DataTypes.STRING,
		},
		paymentRatePerHour: {
			type: DataTypes.DOUBLE,
		},
        contactInfo: {
            type: DataTypes.STRING,
        },
		assignedCollectionRoute: {
			type: DataTypes.STRING,
		},
	});

	return Employee;
};
