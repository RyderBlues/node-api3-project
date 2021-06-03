// require your server and launch it
const server = require('./api/server');

server.listen(4001, () => {
    console.log('listening');
})