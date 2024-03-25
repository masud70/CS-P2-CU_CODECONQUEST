require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { checkValidity } = require("./middlewares");
const { welcome } = require("./controllers");
const app = express();
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const rbacRouter = require("./routes/rbacRouter");
const adminRouter = require("./routes/adminRouter");
const { initializeDB } = require("./helper");

const PORT = process.env.NODE_DOCKER_PORT_BACKEND || 8000;
var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", checkValidity, async (req, res) => {
	try {
		const result = await welcome();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/rbac", rbacRouter);
app.use('/admin', adminRouter);

app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use((err, req, res, next) => {
	res.json({ success: false, message: err });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: true })
		.then(async () => {
			try {
				await initializeDB();
			} catch (error) {
				console.log(error.message);
			}
			console.log(
				`\n===========================\nApp listening to port ${PORT}\n===========================\n`
			);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
