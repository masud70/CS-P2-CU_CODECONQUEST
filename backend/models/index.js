"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.User.belongsToMany(db.Role, { through: db.UserRole });
db.Role.belongsToMany(db.User, { through: db.UserRole });

db.Permission.belongsToMany(db.Role, { through: db.RolePermission });
db.Role.belongsToMany(db.Permission, { through: db.RolePermission });

db.Sts.belongsToMany(db.User, { through: db.Manager });
db.User.belongsToMany(db.Sts, { through: db.Manager });

db.Landfill.belongsToMany(db.User, { through: db.Manager });
db.User.belongsToMany(db.Landfill, { through: db.Manager });

db.Contractor.belongsToMany(db.User, { through: db.Manager });
db.User.belongsToMany(db.Contractor, { through: db.Manager });

db.Landfill.hasMany(db.DumpEntry);
db.DumpEntry.belongsTo(db.Landfill);

db.Sts.hasMany(db.StsDeparture);
db.StsDeparture.belongsTo(db.Sts);

db.Sts.hasMany(db.Vehicle);
db.Vehicle.belongsTo(db.Sts);

// db.Contractor.hasMany(db.Vehicle);
// db.Vehicle.belongsTo(db.Contractor);

// db.Vehicle.hasMany(db.StsEntry);
// db.StsEntry.belongsTo(db.Vehicle);

db.Contractor.hasMany(db.StsEntry);
db.StsEntry.belongsTo(db.Contractor);

db.Sts.hasMany(db.StsEntry);
db.StsEntry.belongsTo(db.Sts);

db.Contractor.hasMany(db.Employee);
db.Employee.belongsTo(db.Contractor);

db.Manager.hasMany(db.CollectionPlan);
db.CollectionPlan.belongsTo(db.Manager);

db.Employee.hasMany(db.EmployeeWorkLog);
db.EmployeeWorkLog.belongsTo(db.Employee);

db.Employee.hasMany(db.EmployeeActivityLog);
db.EmployeeActivityLog.belongsTo(db.Employee);

db.Employee.hasMany(db.EmployeeLoginLogoutLog);
db.EmployeeLoginLogoutLog.belongsTo(db.Employee);

db.Vehicle.hasMany(db.StsDeparture);
db.StsDeparture.belongsTo(db.Vehicle);

db.User.hasMany(db.DumpEntry);
db.DumpEntry.belongsTo(db.User);

db.Vehicle.hasMany(db.DumpEntry);
db.DumpEntry.belongsTo(db.Vehicle);

db.User.hasMany(db.Otp);
db.Otp.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
