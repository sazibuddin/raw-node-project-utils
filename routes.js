// Dependencies

const {sampleHandler} = require('./handlers/routehandler/sampleHandler');
const {userHandler} = require('./handlers/routehandler/userHandler');

const routes = {
    'sample': sampleHandler,
    'user': userHandler,
};

module.exports = routes;