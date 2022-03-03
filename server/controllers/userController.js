const dbConnection = require('../utils/dbConnection');
const bcrypt = require('bcrypt');
const { verify } = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashPass = await bcrypt.hash(password, 10);

        await dbConnection.query(
            "INSERT INTO accounts(username, email, password, created_on, last_login) VALUES ($1, $2, $3, NOW(), NOW())",
            [username, email, hashPass],
            (err, res) => {
                if(err){
                    console.log(err);
                }
            }
        );
    }
    catch (e) {
        res.status(400).send({error: `${e}`});
    }

};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await dbConnection.query(
            "SELECT * FROM accounts WHERE username=$1",
            [username]
        );

        if (result.rows.length > 0) {
            const valid = await bcrypt.compare(password, result.rows[0].password);
            if(valid) {
                res.status(200).json({message: 'Вы успешно вошли!'})
            }
            else res.status(400).json({message: 'Неверный пароль!'});
        }
        else res.status(400).json({message: 'Данного пользователя не существует!'});
    }
    catch (e) {
        res.status(400).send({error: `${e}`});
    }
};