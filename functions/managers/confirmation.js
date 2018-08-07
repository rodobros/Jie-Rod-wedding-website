"use strict";

var Q = require("q");
var firebase = require('firebase');
var validator = require('validator');

// Get a reference to the database service
var database = firebase.database();

const MODEL = [
  "firstname",
  "lastname",
  "email",
  "allergy",
  "host"
];

var self = {};

/**
 * Creates a product in the database.
 *
 * @param product         The product to create in the database.
 * @returns {promise|*}   A promise object that indicates if an error occurred during the deletion (TRUE/FALSE).
 */
self.createConfirm = function(confirm) {
  var deferred = Q.defer();

  var isValid = MODEL.every(function(property) {
    return property in confirm;
  });

  if (!isValid) {
    deferred.resolve(400);
    return deferred.promise;
  }

  self.getConfirm(confirm.firstname, confirm.lastname).done(function(confirmation) {
    if(confirmation.data === null){ // a person with that name hasn't already confirmed
      isValid &= !!validator.trim(confirm.firstname);
      isValid &= (confirm.firstname == validator.blacklist(confirm.firstname, '><=\\"'));
      isValid &= !!validator.trim(confirm.lastname);
      isValid &= (confirm.lastname == validator.blacklist(confirm.lastname, '><=\\"'));
      isValid &= !!validator.trim(confirm.email);
      isValid &= !!validator.isEmail(confirm.email);
      isValid &= !confirm.allergy || !!validator.trim(confirm.allergy);
      isValid &= !confirm.allergy ||(confirm.allergy == validator.blacklist(confirm.allergy, '><=\\"'));
      isValid &= !confirm.host || !!validator.trim(confirm.host);
      isValid &= !confirm.host || (confirm.host == validator.blacklist(confirm.host, '><=\\"'));
      if (!isValid) {
        deferred.resolve(400);
        return deferred.promise;
      }
      confirm.host = validator.blacklist(confirm.host, "");
      confirm.allergy = validator.blacklist(confirm.allergy, "");

      var confirms = database.ref("Confirmations/");
      var newConfirmKey = confirms.push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['Confirmations/' + newConfirmKey] = confirm;
      database.ref().update(updates);
      
      deferred.resolve(false);
    }
    else {
      deferred.resolve(303);
    }
  })
  return deferred.promise;
};

self.getConfirms = function() {
  var deferred = Q.defer();
  var filter = {};
  var confirms = database.ref("Confirmations/");
  confirms.on('value', function(snapshot) {
    deferred.resolve({ err: false, data: snapshot });
  });
  return deferred.promise;
};

self.getConfirm = function(firstn, lastn) {
  var deferred = Q.defer();
  var confirms = database.ref("Confirmations/");
  confirms.on('value', function(snapshot) {
    var isFound = false;
    snapshot.forEach(function(s){
      var sObject = JSON.parse(JSON.stringify(s));
      if(sObject.firstname == firstn && sObject.lastname == lastn){
        deferred.resolve({ err: false, data: sObject});
        isFound = true;
      }
    });
    if(!isFound){
      deferred.resolve({ err: true, data: null});
    }
  });
  return deferred.promise;
}

module.exports = self;
