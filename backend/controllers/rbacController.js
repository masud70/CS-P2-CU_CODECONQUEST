const db = require("../models");

module.exports = {
	getAllRoles: async () => {
		try {
			const roles = await db.Role.findAll();
			const roleTitles = roles.map((role) => role.title);

			return {
				success: true,
				roles: roleTitles,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	createRole: async ({ title }) => {
		try {
			const role = await db.Role.create({ title });

			return {
				success: true,
				message: "Role created successfully!",
				role: role,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	updateRole: async ({ id, title }) => {
		try {
			const role = await db.Role.findByPk(id);

			role.title = title;
			await role.save();

			return {
				success: true,
				message: "Role updated successfully!",
				role: role,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	deleteRole: async ({ id }) => {
		try {
			const deleteCount = await db.Role.destroy({ where: { id } });

			if (deleteCount === 1) {
				return {
					success: true,
					message: "Role deleted successfully!",
				};
			} else {
				throw new Error("Delete failed!");
			}
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	getAllPermissions: async () => {
		try {
			const permissions = await db.Permission.findAll();
			const permissionArray = permissions.map((item) => item.type);

			return {
				success: true,
				permission: permissionArray,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	createPermission: async ({ type }) => {
		try {
			const permission = await db.Permission.create({ type });

			return {
				success: true,
				message: "Permission created successfully!",
				permission: permission,
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	addPermissionToRole: async ({ roleId, permissionIds }) => {
		try {
			const role = await db.Permission.findByPk(roleId);

			if (!role) {
				throw new Error(`Role with id ${roleId} not found.`);
			}

			const permissions = await db.Permission.findAll({
				where: { id: permissionIds },
			});

			const rolePermissionRecords = permissions.map((permissionId) => {
				return { RoleId: roleId, PermissionId: permissionId.id };
			});

			await db.RolePermission.bulkCreate(rolePermissionRecords);

			return {
				success: true,
				message: "Permissions added to role successfully!",
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},

	addRoleToUser: async ({ userId, roleIds }) => {
		try {
			const user = await db.User.findByPk(userId);

			if (!user) {
				throw new Error(`User with id ${userId} not found!`);
			}

			const roles = await db.Role.findAll({
				where: { id: roleIds },
			});

			const userRoleRecords = roles.map((role) => {
				return { UserId: userId, RoleId: role.id };
			});

			await db.UserRole.bulkCreate(userRoleRecords);

			return {
				success: true,
				message: "Roles added to user successfully!",
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
			};
		}
	},
};
