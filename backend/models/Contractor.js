module.exports = (sequelize, DataTypes) => {
	const Contractor = sequelize.define("Contractor", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		contractId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		companyName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		regId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		regDate: {
			type: DataTypes.BIGINT,
		},
		tin: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactNumber: {
			type: DataTypes.STRING,
		},
		workforceSize: {
			type: DataTypes.INTEGER,
		},
		paymentPerTon: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		requiredAmountWastePerDay: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		contractDurationInMonth: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		areaOfCollection: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});

	return Contractor;
};
