const router = require('express').Router();
const dbConnection = require('./utils/dbConnection');

router.get('/data', (req, res) => {
    dbConnection.query('SELECT * FROM users', (err, res) => {
        if(err){

        }
        else {
            console.log(res.rows);
        }
    });
})

router.post('/api/createtoilet', (req, res) => {
    console.log(req.body);
});

module.exports = router;