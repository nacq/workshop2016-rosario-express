'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class TrackModel {

    getList () {
        return dataBase.find({docType: docTypes.TRACK})
    }

		getById (id) {
			return dataBase.findOne({ _id: id })
		}

		getComments (id) {
			return new Promise((resolve, rejected) => {
				dataBase.findOne({ _id: id })
					.then(band => {
						console.log(band)
						resolve(band.comments)
					})
					.catch(err => {
						rejected(err)
					})
			})
		}



}
module.exports.TrackModel = TrackModel;
module.exports.instance = new TrackModel();
