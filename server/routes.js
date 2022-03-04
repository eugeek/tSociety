const router = require('express').Router();
const {
    createToilet,
    getToilets
} = require('./controllers/mapController');
const {
    register,
    login,
    google, me
} = require('./controllers/userController');

router.post('/api/createtoilet', createToilet);

router.get('/api/gettoilets', getToilets);

router.post('/api/register', register);

router.post('/api/login', login);

router.post('/api/google', google);

router.get('/me', me);

module.exports = router;