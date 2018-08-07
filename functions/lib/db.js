"use strict";

var mongoose = require("mongoose");
var sanitizerPlugin = require('mongoose-sanitizer');
var Schema = mongoose.Schema;

var QuestionAnswerSchema = new Schema({
  id: { type: Number, unique: true },
  question: String,
  answers: [{letter: String,text: String}],
  rightAnswer: String,
  GGMessage: String
}, { versionKey: false });

var Confirmation = new Schema({
  id: { type: Number, unique: true },
  firstname: {type:String, required: true},
  lastname: {type:String, required: true},
  email: {type:String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/, 'Please fill a valid email address']},
  host: String,
  allergy: String
}, { versionKey: false });

Confirmation.plugin(sanitizerPlugin);
QuestionAnswerSchema.plugin(sanitizerPlugin);

mongoose.model("QuestionAnswer", QuestionAnswerSchema, "QuestionsAnswers");
mongoose.model("Confirmation", Confirmation, "Confirmation");

mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(uri, options);

mongoose.connect("mongodb://admin:admin@ds046367.mlab.com:46367/rodandjie", options);

