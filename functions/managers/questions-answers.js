"use strict";

var Q = require("q");
//var mongoose = require("mongoose");
var firebase = require('firebase');
var validator = require('validator');
//var QuestionAnswer = mongoose.model("QuestionAnswer");

// Get a reference to the database service
var database = firebase.database();

var self = {};

self.getQuestionsAnswers = function() {
  var deferred = Q.defer();
  var filter = {};
  var questionsAnswers = database.ref("QuestionsAnswers/");
  questionsAnswers.on('value', function(snapshot) {
    deferred.resolve({ err: false, data: snapshot });
  });
  /*
  QuestionAnswer.find(filter, { _id: 0 }).lean().exec(function(err, questionsAnswers) {
    if (err) {
      deferred.resolve({ err: true, data: [] });
    } else {
      deferred.resolve({ err: false, data: questionsAnswers });
    }
  });
  */
  return deferred.promise;
};

module.exports = self;
