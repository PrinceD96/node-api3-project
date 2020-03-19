const express = require("express");

const server = express();

const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use(logger);

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

module.exports = server;
