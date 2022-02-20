const express = require('express');
const cors = require('cors');
const config = require('./config');
const router = require('./routes');
const PORT = config.server.port;

const server = new express();

server.use(cors());
server.use(router);

server.listen(PORT, () => {
    console.log(`> Server has been starting on ${PORT}`)
});