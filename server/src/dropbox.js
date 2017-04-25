var Dropbox = require('dropbox');
var oauth2cred = require('./credentials.json').cloud_services.dropbox;
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

function getFiles(token, path, cursor, callback) {
  if (path == null) {
    path = '';
  }
  var whenSuccess = function(response) {
    var res = { path: path };
    if (response.has_more) {
      res.cursor = response.cursor
    }
    res.files = response.entries.map(file => {
      return {
        id: file.id,
        name: file.name,
        type: file[".tag"],
        path: file.path_lower
      }
    });
    res.files.sort(function(f1, f2) {
      if (f1.type == f2.type) {
        return f1.name.localeCompare(f2.name)
      } else {
        return f1.type == "folder" ? -1 : 1
      }
    })
    callback(res);
  };

  var dbx = new Dropbox({ accessToken: token.access_token });
  if (cursor == null || cursor == "") {
    dbx.filesListFolder({path: path})
      .then(whenSuccess)
      .catch(function(error) {
        console.log(error);
        callback(null);
      });
  } else {
    dbx.filesListFolderContinue({cursor: cursor})
      .then(whenSuccess)
      .catch(function(error) {
        console.log(error);
        callback(null);
      });
  }
}
module.exports.getFiles = getFiles

function getSharedLink(token, fileId, callback) {
  var dbx = new Dropbox({ accessToken: token.access_token });
  dbx.filesGetTemporaryLink({path: fileId})
    .then(function (data) {
      callback(data.link);
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
}
module.exports.getSharedLink = getSharedLink

var url = "https://www.dropbox.com/oauth2/authorize"
              + "?response_type=code"
              + "&client_id=" + oauth2cred.clientId
              + "&redirect_uri=" + oauth2cred.redirectUrl;

function getOAuthURL() {
  return url;
}
module.exports.getOAuthURL = getOAuthURL
