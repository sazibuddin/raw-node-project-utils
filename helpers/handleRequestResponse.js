const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routehandler/notFoundHandler');
const { parseJson } = require('./utilities');

//module scaffolding
const handler = {};
 handler.handleReqRes = (req, res) => {
     const parsedUrl = url.parse(req.url, true);
     const path = parsedUrl.pathname;
     const trimmedPath = path.replace(/^\/+|\/+$/g, '');
     const method = req.method.toLowerCase();
     const queryStringObject = parsedUrl.query;
     const headerObject = req.headers;

     const requestProperties = {
       parsedUrl,
         path,
         trimmedPath,
         method,
         queryStringObject,
         headerObject
     };

     // res.end(JSON.stringify(queryStringObject));

     const decoder = new StringDecoder('utf-8');
     let realData = '';

     const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

     const handleRouteCallback = (statusCode, payload) => {
         statusCode === typeof(statusCode) === 'number' ? statusCode : 500;
         payload === typeof(payload) === 'object'  ? payload : {};

         console.log("Payload", payload);
         const payloadString = JSON.stringify(payload);

         res.setHeader('Content-Type', 'application.json');
         res.writeHead(statusCode);
         res.end(payloadString);
     }

     req.on('data', (buffer) => {
         realData += decoder.write(buffer);
     })

     req.on('end', () => {
         realData += decoder.end();
         requestProperties.body = parseJson(realData);
         chosenHandler(requestProperties, handleRouteCallback);
     })

 }

 module.exports = handler;