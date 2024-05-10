module.exports = (sequelize, DataTypes) => {
	const CollectionPlan = sequelize.define("CollectionPlan", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		areaOfCollection: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startTime: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		durationForCollection: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		numberOfVan: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		expectedWeightPerDay: {
			type: DataTypes.INTEGER,
		},
	});

	return CollectionPlan;
};
