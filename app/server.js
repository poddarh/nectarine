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

export function getFilesAndFolders(userId, cloud_service, cb){
  //insert logic here
  emulateServerReturn({success:true}, cb);
}

export function addUserCloudServices(userID, type, authDetails, cb) {
  var userData = readDocument('users', userID);
  //var cloudServicesData = readDocument('cloud_services', );
  userData.cloud_services[type] = authDetails
  writeDocument('users', userData);
  emulateServerReturn(userData.cloud_services, cb);
}

export function removeUserCloudServices(userID, type, cb) {
  var userData = readDocument('users', userID);
  delete userData.cloud_services[type]
  writeDocument('users', userData);
  emulateServerReturn(userData.cloud_services, cb);
}
