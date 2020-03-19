const express = require("express");

const postDb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
	// do your magic!
});

router.get("/:id", (req, res) => {
	// do your magic!
});

router.delete("/:id", (req, res) => {
	// do your magic!
});

router.put("/:id", (req, res) => {
	// do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
	const postId = req.params.id;

	postDb
		.getById(postId)
		.then(post => {
			if (post) {
				req.post = post;
				next();
			} else {
				res.status(400).json({ message: "Invalid post id" });
			}
		})
		.catch(error => {
			res.status(500).json({ message: "Could not validate post id", error });
		});
}

module.exports = router;
