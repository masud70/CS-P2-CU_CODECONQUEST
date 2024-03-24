const express = require("express");
const {
	getAllRoles,
	createRole,
	deleteRole,
	updateRole,
	createPermission,
	getAllPermissions,
	addPermissionToRole,
} = require("../controllers/rbacController");
const { systemAdminAccessCheck } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/roles", async (req, res, next) => {
	try {
		const result = await getAllRoles();

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/roles", async (req, res, next) => {
	try {
		const result = await createRole({ title: req.body.title });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.put("/roles/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const result = await updateRole({ id: id, title: req.body.title });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.delete("/roles/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const result = await deleteRole({ id });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.get("/permissions", async (req, res, next) => {
	try {
		const result = await getAllPermissions();

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/permissions", async (req, res, next) => {
	try {
		const { type } = req.body;

		const result = await createPermission({ type });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.put("/permissions", async (req, res, next) => {
	try {
		throw new Error("Not implemented!");
	} catch (error) {
		next(error.message);
	}
});

router.put("/roles/:roleId/permissions", async (req, res, next) => {
	try {
		const roleId = req.params.roleId;
		const permissionIds = req.body.permissionIds;

		const result = await addPermissionToRole({
			roleId: roleId,
			permissionIds: permissionIds,
		});

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.put(
	"/users/:userId/roles",
	systemAdminAccessCheck,
	async (req, res, next) => {
		try {
			const id = req.params.id;
			const result = await deleteRole({ id });

			res.json(result);
		} catch (error) {
			next(error.message);
		}
	}
);

module.exports = router;
