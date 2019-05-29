//build the server
const express = require('express');
const app = express();

//import folder routes
const indexRoutes =  require('./Routes/index');

//import users
const users = require('./Routes/users');


app.use("/", indexRoutes);
app.use("/users", users);


//listenner the port localhost:3000
app.listen(3000);

//export app
module.exports = app;