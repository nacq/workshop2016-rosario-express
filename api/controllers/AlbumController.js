'use strict';

const album = require('../models/AlbumModel').instance;

class AlbumController {
				getAlbumInfo (ids, cb) {
					artist.getAlbumInfo(ids)
						.then(documents => {
							return cb(null, documents)
						})
						.catch(err => {
							return cb(err)
						})
				}
  }
exports.AlbumController = AlbumController;
exports.instance = new AlbumController();
