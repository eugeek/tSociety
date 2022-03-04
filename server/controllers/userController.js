const dbConnection = require('../utils/dbConnection');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('208628736762-vv7ut1a8tac1n36a787bdp4sajrbr0l3.apps.googleusercontent.com');

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

exports.google = async (req, res) => {
    const { token }  = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '208628736762-vv7ut1a8tac1n36a787bdp4sajrbr0l3.apps.googleusercontent.com'
    });
    const { name, email } = ticket.getPayload();

    const user = await dbConnection.query(
        "INSERT INTO accounts(username, email, password, created_on, last_login) VALUES ($1, $2, $3, NOW(), NOW()) ON CONFLICT (email) DO UPDATE SET username=$1 RETURNING *",
        [name, email, 'google-no-password']
    );
    res.status(201);
    res.json({id: user.rows[0].id, name: user.rows[0].username, email: user.rows[0].email});
};

exports.me = async (req, res) => {
    res.status(200).json(req.user);
};