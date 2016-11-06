'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class CommentModel {


		newComment(comment) {
			let myComment = {
				docType: 'COMMENT',
				message: comment.message,
				name: comment.name
			}
			return new Promise((resolve, reject) => {
				dataBase.insert(myComment)
					.then(newComment => {
						return dataBase.update({ _id: comment._id, docType: docTypes.TRACK },
						{ $inc: { 'commentsCount': 1 }, $push: { 'comments': newComment._id } })
					})
					.then(res => resolve(res))
					.catch(err => reject(err))
			})
		}

		deleteComment(trackId, commentId) {
			return new Promise((resolve, rejected) => {
				dataBase.remove({ _id: commentId, docType: docTypes.COMMENT })
					.then(res => {
						return dataBase.update({ _id: trackId, docType: docTypes.TRACK },
						{ $inc: { 'commentsCount': -1 }, $pull: { 'comments': commentId } })
					})
					.then(response => resolve({ message: 'Comment deleted successfully' }))
					.catch(err => rejected(err))
			})

		}
}
module.exports.CommentModel = CommentModel;
module.exports.instance = new CommentModel();
