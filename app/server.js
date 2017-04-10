import {readDocument, writeDocument, addDocument} from './database.js';

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

export function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam){
        return sParameterName[1];
      }
    }
  }
