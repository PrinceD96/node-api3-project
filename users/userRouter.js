const express = require("express");

const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
	// do your magic!
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

	db.getById(id)
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
}

module.exports = router;
