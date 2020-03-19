const express = require("express");

const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
	// do your magic!
	const user = req.body;

	userDb
		.insert(user)
		.then(user => res.status(201).json(user))
		.catch(error => {
			res
				.status(500)
				.json({ message: "Error adding user to the database", error });
		});
});

router.post("/:id/posts", (req, res) => {
	// do your magic!
});

router.get("/", (req, res) => {
	// do your magic!
});

router.get("/:id", (req, res) => {
	// do your magic!
});

router.get("/:id/posts", (req, res) => {
	// do your magic!
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	const { id } = req.params;

	userDb
		.getById(id)
		.then(user => {
			user
				? (req.user = user)
				: res.status(400).json({ message: "invalid user id" });
			next();
		})
		.catch(error => {
			console.log(error);
		});
}

function validateUser(req, res, next) {
	// do your magic!
	const { body } = req;

	!body
		? res.status(400).json({ message: "missing user data" })
		: !body.name
		? res.status(400).json({ message: "missing required name field" })
		: next();
}

function validatePost(req, res, next) {
	// do your magic!
	const { body } = req;
	postDb.insert(body).then(post => {
		!body
			? res.status(400).json({ message: "missing post data" })
			: !body.text
			? res.status(400).json({ message: "missing required text field" })
			: next();
	});
}

module.exports = router;
