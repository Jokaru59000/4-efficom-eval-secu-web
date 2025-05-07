const http = require('http');
const app = require('./app.js');

const port = process.env.PORT; // Va chercher le port dans le .env

const server = http.createServer(app);

server.on('listening',() => {
    console.log("server en route sur le port : " + port);
});

server.listen(port);