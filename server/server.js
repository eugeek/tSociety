const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');
const PORT = config.server.port;

const server = new express();

server.use(bodyParser.json());
server.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

server.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
server.use(router);

server.listen(PORT, () => {
    console.log(`> Server has been starting on ${PORT}`)
});