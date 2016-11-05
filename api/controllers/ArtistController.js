'use strict';

const artist = require('../models/ArtistModel').instance;

class ArtistController {
				getArtistInfo (ids, cb) {
					artist.getArtistInfo(ids)
						.then(documents => {
							return cb(null, documents)
						})
						.catch(err => {
							return cb(err)
						})
				}

}
exports.ArtistController = ArtistController;
exports.instance = new ArtistController();
