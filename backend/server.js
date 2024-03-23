require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { checkValidity } = require("./middlewares");
const { welcome } = require("./controllers");
const app = express();

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

app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", message: "Server is healthy" });
});

app.use((err, req, res, next) => {
	res.json({ message: err });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: true })
		.then(() => {
			console.log(`App listening to port ${PORT}`);
		})
		.catch((err) => {
			console.log(err.message);
		});
});