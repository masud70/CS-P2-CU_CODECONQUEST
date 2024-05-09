const express = require("express");
const {
	systemAdminAccessCheck,
	checkLogin,
} = require("../middlewares/authMiddleware");
const {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	getAllAvailableRoles,
	updateRole,
	createUser,
} = require("../controllers/userController");
const Roles = require("../constants");
const router = express.Router();

router.get("/", systemAdminAccessCheck, async (req, res) => {
	try {
		const result = await getAllUsers();
		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.get("/roles", (req, res) => {
	const result = getAllAvailableRoles();
	res.json(result);
});

router.get("/:userId", async (req, res) => {
	try {
		const data = req.params;
		const result = await getUserById(data);

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/", systemAdminAccessCheck, async (req, res) => {
	try {
		const data = req.body;
		const result = await createUser(data);

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.put("/:userId/roles", systemAdminAccessCheck, async (req, res) => {
	try {
		const { role } = req.body;
		const userId = req.params.userId;

		const result = await updateRole({
			userId: userId,
			role: role,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.put("/:userId", checkLogin, async (req, res, next) => {
	try {
		const user = req.body;
		const userId = req.params.userId;
		const roles = req.role;

		if (req.userId == userId || roles.includes(Roles.SYSTEM_ADMIN)) {
			const result = await updateUser({
				userId: userId,
				data: user,
			});

			res.json(result);
		} else {
			throw new Error("Invalid access!");
		}
	} catch (error) {
		next(error.message);
	}
});

router.delete("/:userId", systemAdminAccessCheck, async (req, res) => {
	try {
		const userId = req.params.userId;
		const result = await deleteUser({ userId });

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

module.exports = router;
