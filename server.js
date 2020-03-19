const express = require("express");

const server = express();
const userRouter = require("./users/userRouter");

const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use(logger);
server.use("/users", userRouter);

server.get("/", (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	console.log(
		"logger",
		req.method,
		req.originalUrl,
		new Date()
			.toISOString()
			.slice(0, 19)
			.replace("T", " ")
	);
	next();
}

server.use((err, req, res, next) => {
	console.error(err);

	res
		.status(500)
		.json({ message: "There was an error performing the required operation" });
});

module.exports = server;
