import {readDocument, writeDocument, addDocument, removeDocument} from './database.js';

var token = 'eyJpZCI6MX0='; // <-- Put your base64'd JSON token here

function NectarineError(message) {
  console.log(message);
}

/**
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      NectarineError('Could not ' + verb + " " + resource + ": Received " +
          statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    NectarineError('Could not ' + verb + " " + resource +
        ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    NectarineError('Could not ' + verb + " " + resource +
        ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getUserData(user, cb) {
  sendXHR('GET', '/users/1', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function updateUserData(data, cb) {
  sendXHR('PUT', '/users/1', data, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  })
}

export function sendContactEmail(form, cb) {
  sendXHR('POST', '/email', form, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
	//Logic to send an email here!
//  emulateServerReturn({success:true}, cb);
}

export function getUserCloudServices(userID, cb) {
  sendXHR('GET', '/user/cloudservices', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getFilesAndFolders(userId, cloud_service, cb){
  //insert logic here
  emulateServerReturn({success:true}, cb);
}

export function addUserCloudServices(userID, type, authDetails, cb) {
  sendXHR('POST', '/user/cloudservices/' + type, authDetails, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function removeUserCloudServices(userID, type, cb) {
  sendXHR('DELETE', '/user/cloudservices/' + type, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function resetdb() {
  sendXHR('POST', '/resetdb', undefined, () => {});
}
