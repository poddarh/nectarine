const IS_PRODUCTION = (process.argv.length > 2 && process.argv[2] === "prod");

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./database.js');
var validate = require('express-jsonschema').validate;
var ExpressPeerServer = require('peer').ExpressPeerServer;

var cloud_services = {
  google_drive: require('./google.js'),
  dropbox: require('./dropbox.js')
}

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('../client/build'));

/**
 * Get the user ID from a token. Returns -1 (an invalid ID)
 * if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Add custom endpoints here

app.get('/user/cloudservices', function(req, res) {
  var userId = getUserIdFromToken(req.get('Authorization'));
  var userData = readDocument('users', userId);
  res.send(userData.cloud_services);
});

app.get('/user/cloudservices/:service/oauth', function(req, res) {
  res.writeHead(302, {
  'Location': cloud_services[req.params.service].getOAuthURL()
  });
  res.end();
});

app.post('/user/cloudservices/:service', function(req, res) {
  var body = req.body;
  cloud_services[req.params.service].getTokenFromKey(body, token => {
    if(token == null) {
      res.status(403).end();
    } else {
      var userId = getUserIdFromToken(req.get('Authorization'));
      var userData = readDocument('users', userId);
      var addedToken = addDocument('cloud_services', token)
      userData.cloud_services[req.params.service] = addedToken._id;
      writeDocument('users', userData);
      res.send(userData.cloud_services);
    }
  });
})

app.delete('/user/cloudservices/:type', function(req, res) {
  var userId = getUserIdFromToken(req.get('Authorization'));
  var userData = readDocument('users', userId);
  var cloud_services_id = userData.cloud_services[req.params.type];
  deleteDocument("cloud_services", cloud_services_id);
  delete userData.cloud_services[req.params.type];
  writeDocument('users', userData);
  res.send(userData.cloud_services);
})

app.get('/user/cloudservices/:service/files', function(req, res) {
  var userId = getUserIdFromToken(req.get('Authorization'));
  var userData = readDocument('users', userId);
  if (userData.cloud_services[req.params.service] == null) {
    res.status(403).end()
  }
  var token = readDocument('cloud_services', userData.cloud_services[req.params.service]);

  var path = req.query.path;
  var cursor = req.query.cursor;

  cloud_services[req.params.service].getFiles(token, path, cursor, response => {
    if(response == null) {
      res.status(400).end();
    } else {
      res.send(response);
    }
  });
})

// Reset the database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
	database.resetDatabase();
  res.send({ success: true });
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

if (IS_PRODUCTION) {
  var fs = require('fs');
  var https = require('https');
  var privateKey  = fs.readFileSync('sslcert/nectari_me.key', 'utf8');
  var certificate = fs.readFileSync('sslcert/nectari_me.crt', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
  var httpsServer = https.createServer(credentials, app);
  var port = 443;
  httpsServer.listen(port, function () {
    console.log('Example app listening on port ' + port + "!");
  });
  app.use('/api', ExpressPeerServer(httpsServer, {}));

  // set up plain http server with a route to redirect http to https
  var http = express.createServer();
  http.get('*',function(req,res){
      res.redirect('https://' + req.get('host') + req.originalUrl)
  })
  http.listen(80);
} else {
  var http = require('http');
  var httpServer = http.createServer(app);
  var port = 3000;
  httpServer.listen(port, function () {
    console.log('Example app listening on port ' + port + "!");
  });
  app.use('/api', ExpressPeerServer(httpServer, {}));
}
