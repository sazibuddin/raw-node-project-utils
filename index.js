const http = require('http');
const { handleReqRes } = require('./helpers/handleRequestResponse')
const environment = require('./helpers/environment');
const data = require('./lib/data');

//app object - module scaffolding
const app = {};

// data.create('test', 'user004', {'name' : 'Sazib', 'country': 'Bangldesh'}, function (err) {
//     console.log("error ", err);
// })

data.read('test', 'user004', function (err, result) {
    console.log(err, result);
})

// data.update('test', 'user004', {"name":"Nahid cudirvai","country":"Uganda"} ,function (err, result) {
//     console.log(err, result);
// })

//Configuration
app.config = {
    port: 3002,
};

//Create server
app.createServer = () => {
    const server  = http.createServer(app.handleReqRes);
    server.listen(environment.port,  () => {
        console.log(`Listending port no ${environment.port}`);
    })
}

//Handle request response

app.handleReqRes = handleReqRes;

app.createServer();