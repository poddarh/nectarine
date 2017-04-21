var Dropbox = require('dropbox');
var oauth2cred = require('./dropbox-oauth-cred.json');
var request = require('request');

function getTokenFromKey(data, callback) {
  request.post(
      'https://api.dropboxapi.com/oauth2/token',
      {
        form: {
          code: data.key,
          grant_type: "authorization_code",
          client_id: oauth2cred.clientId,
          client_secret: oauth2cred.clientSecret,
          redirect_uri: oauth2cred.redirectUrl
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          callback(JSON.parse(body));
        } else {
          console.log(error);
          callback(null);
        }
      }
  );
}
module.exports.getTokenFromKey = getTokenFromKey

function getFiles(token, parent, pageToken, callback) {
  if (parent == null) {
    parent = '';
  }
  var dbx = new Dropbox({ accessToken: token.access_token });
  dbx.filesListFolder({path: parent})
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      console.log(error);
      callback(null);
    });
}
module.exports.getFiles = getFiles

var url = "https://www.dropbox.com/oauth2/authorize"
              + "?response_type=code"
              + "&client_id=" + oauth2cred.clientId
              + "&redirect_uri=" + oauth2cred.redirectUrl;

function getOAuthURL() {
  return url;
}
module.exports.getOAuthURL = getOAuthURL
