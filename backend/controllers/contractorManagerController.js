const db = require("../models");

module.exports = {
	employeeRegister: async (data) => {
		try {
			if (!data.employeeId) {
				throw new Error("Invalid employee ID!");
			}
			const employee = await db.Employee.findAll({
				where: { employeeId: data.employeeId },
			});

			if (employee.length === 0) {
				const created = db.Employee.create(data);
				if (!created) {
					throw new Error(
						"There was an error creating the employee!"
					);
				}

				return {
					success: true,
					message: "Employee created successfully!",
					employee: created,
				};
			}
		} catch (error) {
			return {
				success: false,
				message: error.message,
			};
		}
	},
};
