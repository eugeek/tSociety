const dbConnection = require('../utils/dbConnection');

exports.createToilet = async (req, res) => {
    await dbConnection.query(
        "INSERT INTO toilets(description, props, owner, created_on, coords) VALUES ($1, $2, $3, NOW(), $4)",
        [req.body.description, req.body.props ,'admin', req.body.latlng],
        (err, res) => {
            if(err){
                console.log(err);
            }
            else {
                console.log('Toilet has added!');
            }
        }
    );
};

exports.getToilets = async (req, res) => {
    await dbConnection.query(
        "SELECT * FROM toilets",
        (err, result) => {
            if(err){
                console.log(err);
            }
            else {
                res.status(200).json(result.rows);
            }
        }
    );
};