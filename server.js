//Setup ======================================================
var express = require('express');
var mongoose = require('mongoose');					// mongoose for mongodb
var morgan = require('morgan');						// log request to the console (express 4)
var bodyParser = require('body-parser');			// pull information from HTML POST (express 4)
var methodOverride = require('method-override');	// simulte DELETE and PUT (express 4)
var port = process.env.PORT || 8080

// create our app with express
var app = express();		

/******************** Configuration ******************/
//mongoose.connect('mongodb://127.0.0.1:27017/todoist');			// connect to mongdoDB database
var database = require('./config/database');
mongoose.connect(database.url_transactions);
//mongoose.connect(database.url_todos);

// set the static files location
app.use(express.static(__dirname + '/public'));	

// log everything request to the console				
app.use(morgan('dev'));					

// parse application/x-www-form-urlencode						
app.use(bodyParser.urlencoded({'extended' : 'true'}));		

// parse application/json	
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//
app.use(methodOverride());

/******* Routes ********************/
require('./app/routes.js')(app);

// listen 
app.listen(port);
console.log("App listening on port: " + port);