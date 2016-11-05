'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');
const Promise = require('bluebird')

class CommentModel {


		newComment(comment) {
			console.log('my comment', comment)
			let myComment = {
				message: comment.message,
				name: comment.name
			}
			return new Promise((resolve, rejected) => {

				dataBase.update({ _id: comment._id, docType: docTypes.TRACK  },
				{ $inc: { 'commentsCount': 1 }, $push: { 'comments': myComment } },
				{ returnUpdatedDocs: true })
				.then(track => {
					console.log(track)
					resolve(track)
				})
				.catch(err => {
					console.log(err)
					rejected(err)
				})
			})
		}
}
module.exports.CommentModel = CommentModel;
module.exports.instance = new CommentModel();
