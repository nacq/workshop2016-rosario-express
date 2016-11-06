const router = require('express').Router();
const colors = require('colors/safe');
const trackController = require('./controllers/TrackController').instance; //Sample controller
const bandController = require('./controllers/BandController').instance;
const commentController = require('./controllers/CommentController').instance;
const userController = require('./controllers/UserController').instance;
const jwt = require('jsonwebtoken');

// Specific router middleware that shows the request timestamp
router.use((req, res, next) => {
    console.log(`${colors.green('Requesting: ')} ${req.method}  ${req.path}  -> Time: `, Date.now());
    next();
});

router.use((req, res, next) => {
	if(req.originalUrl !== '/signin' && req.originalUrl !== '/signup') {
		let token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token) {
			jwt.verify(token, 'super-complicated-secret', (err, decoded) => {
				if(err) return res.status(401).json({ message: 'Invalid token', error: err })
				req.decoded = decoded;
				next()
			})
		} else {
			return res.status(403).json({ message: 'No token provided' })
		}
	} else {
		return next();
	}
})

// API Routes
router.get('/tracks', trackController.getList); //Sample route
router.get('/tracks/:id', trackController.getById)
router.get('/tracks/:id/comments', trackController.getComments)

router.post('/comments', commentController.newComment)
router.delete('/comments/:trackId/:commentId', commentController.deleteComment)

router.get('/bands', bandController.getList)
router.get('/bands/:id', bandController.getById)
router.get('/bands/:id/albums', bandController.getAlbums)
router.get('/bands/:id/artists', bandController.getArtists)

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)







module.exports = router;
