const express = require("express");
const app = express();
const path = require("path")
const mysql = require("mysql");

require('./src/routes/user')
// Settings
app.set('port', process.env.PORT || 8000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./src/routes/user'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

