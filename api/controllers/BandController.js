'use strict';

const band = require('../models/BandModel').instance;
const artistCtrl = require('./ArtistController').instance;
const albumCtrl = require('./AlbumController').instance;

class BandController {

    getList (req, res) {
        band.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

		getById (req, res) {
			console.log(req.params.id)
			band.getById(req.params.id)
				.then(doc => res.json(doc))
				.catch(err => res.json({ error: err.message }))
		}

		getAlbums (req, res) {
			band.getAlbums(req.params.id)
				.then(docs => {
					res.json(docs)
				})
				.catch(err => res.json({ error: err.message }))
		}

		getArtists (req, res) {
			band.getArtists(req.params.id)
				.then(docs => {
					res.json(docs)
				})
				.catch(err => res.json({ error: err.message }))
		}
}
exports.BandController = BandController;
exports.instance = new BandController();
