var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database.js');
var validate = require('express-jsonschema').validate;

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('../client/build'));

// Add custom endpoints here



// Reset the database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
	database.resetDatabase();
  res.send();
});

/**
* Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
