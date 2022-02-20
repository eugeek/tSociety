const express = require('express');
const PORT = 3080;

const server = new express();

server.listen(PORT, () => {
    console.log(`> Server has been starting on ${PORT}`)
});