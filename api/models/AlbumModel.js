'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');

class AlbumModel {

		getAlbumInfo(ids) {
			return dataBase.find({ _id: { $in: ids } })
		}
}
module.exports.AlbumModel = AlbumModel;
module.exports.instance = new AlbumModel();
