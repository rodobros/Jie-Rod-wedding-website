var express = require("express");
var router = express.Router();
var confirmationManager = require("../managers/confirmation");

// Adds a new confirmation in the database.
router.post("/", function(req, res) {
  confirmationManager.createConfirm(req.body).done(function(errCode) {
    if (errCode) {
      res.status(errCode).send();
    } else {
      res.status(201).send();
    }
  });
});

// Gets the confirmation associated with the specified ID.
router.get("/", function(req, res) {
  if(!req.query.firstname || !req.query.lastname){
    confirmationManager.getConfirms().done(function(result) {
      if (result.err) {
        res.status(404).send();
      } else {
        res.json(result.data);
      }
    });
  }
  else {
    confirmationManager.getConfirm(req.query.firstname, req.query.lastname).done(function(result) {
      if (result.err) {
        res.status(404).send();
      } else {
        res.json(result.data);
      }
    });
  }
});

module.exports = router;
