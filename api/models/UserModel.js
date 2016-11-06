'use strict';

const dataBase = require('../../database/Database').instance;
const docTypes = require('../../database/docTypes');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

class UserModel {

	signUp(user) {
		return new Promise((resolve, reject) => {
			if(user.email && user.password) {
				bcrypt.hash(user.password, 10, (err, hash) => {
					if(err) throw new Error(err)

					let newUser = {
						docType: 'USER',
						password: hash,
						email: user.email
					}
					dataBase.insert(newUser)
						.then(doc => resolve(doc))
						.catch(err => reject(err))
				})
			} else {
				reject({ message: 'Must complete all required fields' })
			}
		})

	}

	signIn(req, res) {
		return new Promise((resolve, reject) => {
			passport.authenticate('local', (err, user, info) => {
				if(err) {
					console.log(err)
					throw new Error(err)
				}
				if(!user) {
					reject({ message: 'Invalid credentials' })
				} else {
					let token = jwt.sign({ id: user._id }, 'super-complicated-secret', { expiresIn: 10000 })
					resolve({ token: token })
				}
			})(req, res)
		})

	}

	findUserByEmail(email, done) {
		dataBase.findOne({ email: email, docType: 'USER' })
			.then(user => done(null, user))
			.catch(err => done(err))
	}

}

exports.UserModel = UserModel;
exports.instance = new UserModel();
