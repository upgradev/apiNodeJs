//build the server
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const config = require('./config/config');

//connection mongodb in my case mongoAtlas
const url  = config.bd_string;

//options of connection
const options = {
    reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true
}


//connection DB with address and option of connections
mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);


//listenner db
mongoose.connection.on('error', (err) => {
    console.log('error in the connection db' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('App disconnected of DB');
});
mongoose.connection.on('connected', () => {
    console.log('Application connected with success!');
});


//body parser config parser body for json
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


//import folder routes roots
const indexRoutes =  require('./Routes/index');

//import router users
const users = require('./Routes/users');

//routes
app.use("/", indexRoutes);
app.use("/users", users);


//listenner the port localhost:3000
app.listen(3000);


//export app
module.exports = app;