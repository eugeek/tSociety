const router = require('express').Router();
const dbConnection = require('./utils/dbConnection');
const {
    createToilet,
    getToilets
} = require('./controllers/mapController');
const {
    register,
    login
} = require('./controllers/userController');

router.post('/api/createtoilet', createToilet);

router.get('/api/gettoilets', getToilets);

router.post('/api/register', register);

router.post('/api/login', login);

module.exports = router;