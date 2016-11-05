'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class BandModel {

    getList () {
        return dataBase.find({docType: docTypes.BAND})
    }

		getById (id) {
			return dataBase.findOne({ _id: id })
		}

		getAlbums (id) {
			return new Promise((resolve, rejected) => {
				dataBase.findOne({ _id: id })
					.then(band => {
						return dataBase.find({ _id: { $in: band.albums }, docType: docTypes.ALBUM })
					})
					.then(albums => {
						resolve(albums)
					})
					.catch(err => {
						rejected(err)
					})
			})
		}

		getArtists (id) {
			return new Promise((resolve, rejected) => {
				dataBase.findOne({ _id: id })
					.then(band => {
						return dataBase.find({ _id: { $in: band.artists }, docType: docTypes.ARTIST })
					})
					.then(artists => {
						resolve(artists)
					})
					.catch(err => {
						rejected(err)
					})
			})

		}
}
module.exports.BandModel = BandModel;
module.exports.instance = new BandModel();
