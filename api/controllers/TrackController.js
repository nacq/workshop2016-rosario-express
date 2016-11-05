'use strict';

const track = require('../models/TrackModel').instance;

class TrackController {

    getList (req, res) {
        track.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

		getById (req, res) {
			console.log(req.params.id)
			track.getById(req.params.id)
				.then(doc => res.json(doc))
				.catch(err => res.json({ error: err.message }))
		}

		getComments (req, res) {
			track.getComments(req.params.id)
				.then(docs => {
					res.json(docs)
				})
				.catch(err => res.json({ error: err.message }))
		}

}
exports.TrackController = TrackController;
exports.instance = new TrackController();
