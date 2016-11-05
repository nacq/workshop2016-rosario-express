'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class ArtistModel {

		getArtistInfo(ids) {
			return dataBase.find({ _id: { $in: ids } })
		}
		
}
module.exports.ArtistModel = ArtistModel;
module.exports.instance = new ArtistModel();
