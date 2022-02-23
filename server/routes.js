const router = require('express').Router();
const dbConnection = require('./utils/dbConnection');
const {
    createToilet, getToilets
} = require('./controllers/mapController');

router.get('/data', (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, res) => {
        if(err){

        }
        else {
            console.log(res.rows);
        }
    });
})

router.post('/api/createtoilet', createToilet);

router.get('/api/gettoilets', getToilets);

module.exports = router;