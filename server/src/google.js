var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2cred = require('./credentials.json').cloud_services.google_drive;

var oauth2Client = new OAuth2(oauth2cred.clientId, oauth2cred.clientSecret, oauth2cred.redirectUrl);

function getTokenFromKey(data, callback) {
  var key = data.key;
  oauth2Client.getToken(key, function(err, token) {
    if (err) {
      console.log(err);
      callback(null);
    } else {
			callback(token);
		}
  });
}
module.exports.getTokenFromKey = getTokenFromKey

function getFiles(token, path, cursor, callback) {
  if (path == null || path == "") {
    path = "root";
  }
  if (cursor == null) {
    cursor = undefined;
  }
  oauth2Client.credentials = token;
  var service = google.drive('v3');
  service.files.list({
    auth: oauth2Client,
    pageToken: cursor,
    pageSize: 100,
    fields: "nextPageToken, files(id, name, mimeType)",
    q: "'" + path + "' in parents"
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      callback(null);
    }
    var res = { path: path };
    if (response.nextPageToken !== undefined) {
      res.cursor = response.nextPageToken;
    }
    res.files = response.files.map(file => {
      return {
        id: file.id,
        name: file.name,
        type: file.mimeType === "application/vnd.google-apps.folder" ? file.type = "folder" : file.type = "file",
        path: file.id
      }
    });
    callback(res);
  });
}
module.exports.getFiles = getFiles

var scopes = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
  // If you only need one scope you can pass it as a string
  scope: scopes
});

function getOAuthURL() {
  return url;
}
module.exports.getOAuthURL = getOAuthURL
