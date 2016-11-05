'use strict';

const comment = require('../models/CommentModel').instance;

class CommentController {

		newComment(req, res) {
			console.log(req.body)
			comment.newComment(req.body)
				.then(response => {
					console.log(response)
					res.json(response)
				})
				.catch(err => res.json({ err: err.message }))
		}
}
exports.CommentController = CommentController;
exports.instance = new CommentController();
