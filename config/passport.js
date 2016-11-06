const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const	user = require('../api/models/UserModel').instance;
const bcrypt = require('bcrypt');


module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
    passwordField: 'password',
	}, (email, password, done) => {
			user.findUserByEmail(email, (err, user) => {
				if (err) {
					console.log(err);
					return done(err);
				}
				if(!user) {
					console.log('no user find');
					return done(null, false, { message: 'Incorrect username' })
				} else {
					bcrypt.compare(password, user.password, (err, authenticated) => {
						if(err || !authenticated) {
							return done(null, false, { message: 'Invalid password' })
						} else {
							return done(null, user)
						}
					})
				}
			})
		}
	))
}
