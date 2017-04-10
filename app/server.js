import {readDocument, writeDocument, addDocument, removeDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getUserData(userId, cb) {
  var userData = readDocument('users', userId);
  emulateServerReturn(userData, cb);
}

export function updateUserData(data, cb) {
  writeDocument('users', data);
  emulateServerReturn(data, cb);
}

export function sendContactEmail(form, cb) {
	//Logic to send an email here!
  emulateServerReturn({success:true}, cb);
}

export function getUserCloudServices(userID, cb) {
  var userData = readDocument('users', userID);
  var cloudServicesData = userData.cloud_services;
  emulateServerReturn(cloudServicesData, cb);

}

//export function getUserCloudServicesSync()

export function addUserCloudServices(userID, type, cb) {
  var userData = readDocument('users', userID);
  //var cloudServicesData = readDocument('cloud_services', );
  var cloudServicesData = userData.cloud_services;
  var newCloudServicesData = {};
  if(type === "google_drive") {
    //cloudServicesData = readDocument(userData.cloud_services, "google_drive");
    newCloudServicesData = {
      "google_drive": {
        "token": 234236554,
        "expiry": 1434396643584
      }
    }
  }
  else if(type === "dropbox") {
    //cloudServicesData = readDocument(userData.cloud_services, "dropbox");
    newCloudServicesData = {
      "dropbox": {
        "token": 234236554,
        "expiry": 1434396643584
      }
    }
  }
  newCloudServicesData = addDocument(userData.cloud_services, newCloudServicesData)
  emulateServerReturn(newCloudServicesData, cb);
}

export function removeUserCloudServices(userID, type, cb) {
  var userData = readDocument('users', userID);
  var cloudServicesData = userData.cloud_services;
  removeDocument(cloudServicesData, type)
  //userData.cloudServices = userData.cloudServices.map()
  emulateServerReturn(cloudServicesData, cb);
}

/*export function addToken(userID, token, cb) {
  var userData = readDocument('users', userID);
  var tokenData = writeDocument('token', userData.token);
  emulateServerReturn(tokenData, cb);
}*/
