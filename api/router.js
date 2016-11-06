const router = require('express').Router();
const colors = require('colors/safe');
const trackController = require('./controllers/TrackController').instance; //Sample controller
const bandController = require('./controllers/BandController').instance;
const commentController = require('./controllers/CommentController').instance;

// Specific router middleware that shows the request timestamp
router.use((req, res, next) => {
    console.log(`${colors.green('Requesting: ')} ${req.method}  ${req.path}  -> Time: `, Date.now());
    next();
});

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







module.exports = router;
