'use strict';

const comment = require('../models/CommentModel').instance;

class CommentController {

		newComment(req, res) {
			comment.newComment(req.body)
				.then(response => {
					console.log(response)
					res.json(response)
				})
				.catch(err => res.json({ err: err.message }))
		}

		deleteComment(req, res) {
			comment.deleteComment(req.params.trackId, req.params.commentId)
				.then(response => {
					console.log(response)
					res.json(response)
				})
				.catch(err => {
					console.log(err)
					res.json({ err: err.message })
				})
		}
}
exports.CommentController = CommentController;
exports.instance = new CommentController();
