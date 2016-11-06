'use strict';

const user = require('../models/UserModel').instance;

class UserController {

	signUp(req, res) {
		user.signUp(req.body)
			.then(user => res.json(user))
			.catch(error => res.json({ error: error.message }))
	}

	signIn(req, res) {
		user.signIn(req, res)
			.then(doc => res.json(doc))
			.catch(error => res.json({ error: error.message }))
	}

}

exports.UserController = UserController;
exports.instance = new UserController();
