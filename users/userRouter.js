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

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
	// do your magic!
	const user_id = req.params.id;
	const post = { ...req.body, user_id };

	postDb
		.insert(post)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: "Error adding post to the database", error });
		});
});

router.get("/", (req, res) => {
	// do your magic!
	userDb
		.get()
		.then(users => {
			users
				? res.status(200).send(users)
				: res.status(404).json({ message: "no users found" });
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: "There was an error retrieving the users" });
			console.log(error);
		});
});

router.get("/:id", validateUserId, (req, res) => {
	// do your magic!
	res.status(200).send(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
	// do your magic!
	const userId = req.params.id;

	userDb
		.getUserPosts(userId)
		.then(posts => {
			!posts.length
				? res.status(404).json({ message: "No posts found for this user" })
				: res.status(200).send(posts);
		})
		.catch(error => {
			res.status(500).json({ message: error });
		});
});

router.delete("/:id", validateUserId, (req, res) => {
	// do your magic!
	const { id } = req.params;
	userDb
		.remove(id)
		.then(deleted => {
			deleted ? res.status(200).end() : null;
		})
		.catch(error => {
			res
				.status(500)
				.json({ messsage: "Error removing the user from the database", error });
		});
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
	// do your magic!
	const { id } = req.params;
	const updatedUser = req.body;

	userDb
		.update(id, updatedUser)
		.then(updated => {
			updated
				? res.status(200).json(updatedUser)
				: res.status(500).json({ message: "Error retrieving updated user" });
		})
		.catch(error => {
			res.status(500).json({ message: "Error updating the user", error });
		});
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

	!body
		? res.status(400).json({ message: "missing post data" })
		: !body.text
		? res.status(400).json({ message: "missing required text field" })
		: next();
}

module.exports = router;
