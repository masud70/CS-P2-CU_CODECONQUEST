require("dotenv").config();
const express = require("express");
const tox = require("@tensorflow-models/toxicity");
const cors = require("cors");
const db = require("./models");
const { checkValidity } = require("./middlewares");
const { welcome } = require("./controllers");
const app = express();
require("dotenv").config();
const threshold = 0.6;
let model;

const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const rbacRouter = require("./routes/rbacRouter");
const adminRouter = require("./routes/adminRouter");
const utilRouter = require("./routes/utilRouter");
const stsRouter = require("./routes/stsRouter");
const contractorManagerRoute = require("./routes/contractManagerRoute");
const { initializeDB } = require("./helper");
const { managerAccessCheck } = require("./middlewares/authMiddleware");

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

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/rbac", rbacRouter);
app.use("/admin", adminRouter);
app.use("/util", utilRouter);
app.use("/sts", managerAccessCheck, stsRouter);
app.use("/contractorManager", contractorManagerRoute);
app.use("/mobile-api", (req, res) => {
	res.json({
		status: true,
		message: "API called successfully!",
	});
});

app.post("/prediction", async (req, res, next) => {
	try {
		const sentence = req.body.sentence;
		const predictions = await model.classify(sentence);
		const ret = predictions.map((item) => item.results[0].match);
		res.json(ret);
	} catch (error) {
		res.json({ error: error.message });
	}
});

app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use((err, req, res, next) => {
	res.json({ success: false, message: err });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: !true })
		.then(async () => {
			try {
				await initializeDB();
				model = await tox.load(threshold);
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
