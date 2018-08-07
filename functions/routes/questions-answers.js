var express = require("express");
var router = express.Router();
var questionAnswerManager = require("../managers/questions-answers");

// Gets all the products in the database.
router.get("/", function(req, res) {
  questionAnswerManager.getQuestionsAnswers().done(function(result) {
    if (result.err) {
      res.status(400).send();
    } else {
      res.json(result.data);
    }
  });
});
module.exports = router;
