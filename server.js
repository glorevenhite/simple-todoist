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
mongoose.connect('mongodb://127.0.0.1:27017/todoist');			// connect to mongdoDB database

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

/*********** MODEL ************************/
var Todo = mongoose.model('Todo', {
	text	: String,
	done	: Boolean
});

/******* Routes ********************/
app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos){
		if(err)
			res.send(err);
		res.json(todos);
	});
});

app.post('/api/todos', function(req, res) {
	Todo.create({
		text	: req.body.text,
		done	: false
	}, function(err, todo){
		if (err) 
			res.send(err);

		Todo.find(function(err, todos) {
			if(err)
				res.send(err)
			res.json(todos);
		});
	});
});

app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id:req.params.todo_id
	}, function(err, todo) {
		if(err)
			res.send(err);

		Todo.find(function(err, todos) {
			if(err)
				res.send(err);
			res.json(todos);
		});
	});
});

/****** Application **********/
app.get('*', function(req, res) {
	// load the single view file (angualar will handle the page changes on the front-end)
	res.sendfile('./public/index.html');
});

app.listen(port);
console.log("App listening on port " + port);