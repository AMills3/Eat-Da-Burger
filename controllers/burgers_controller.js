// Importing dependencies
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Creating routes
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

router.post("/api/burgers", function(req, res) {
    burger.create(req.body.name, function(result) {
        res.json({ id: result.insertId });
  });
});

router.put("/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne({
        devoured: true
        }, condition, function(data) {
            res.redirect("/");
  });
});

// Export routes
module.exports = router;