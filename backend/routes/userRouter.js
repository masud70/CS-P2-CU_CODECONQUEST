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
} = require("../controllers/userController");
const { createUser } = require("../controllers/authController");
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
		const user_id = req.params.userId;
		const result = await getUserById({ user_id });

		res.json(result);
	} catch (error) {
		next(error.message);
	}
});

router.post("/", systemAdminAccessCheck, async (req, res) => {
	try {
		const user = req.body;

		const result = await createUser({
			email: user.email,
			password: user.password,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.put("/:userId/roles", systemAdminAccessCheck, async (req, res) => {
	try {
		const { role } = req.body;
		const user_id = req.params.userId;

		const result = await updateRole({
			user_id: user_id,
			role: role,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

router.put("/:userId", checkLogin, async (req, res) => {
	try {
		const user = req.body;
		const user_id = req.params.userId;

		if (req.user_id === user_id || req.role === Roles.SYSTEM_ADMIN) {
			const result = await updateUser({
				user_id: user_id,
				data: user,
				role: req.role,
			});

			res.json(result);
		} else {
			throw new Error("Invalid user access!");
		}
	} catch (error) {
		next(error.messsage);
	}
});

router.delete("/:userId", systemAdminAccessCheck, async (req, res) => {
	try {
		const user_id = req.params.userId;

		const result = await deleteUser({
			user_id: user_id,
		});

		res.json(result);
	} catch (error) {
		next(error.messsage);
	}
});

module.exports = router;
