// Import the orm to interact with the DB
var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
      orm.all("burgers", function(res) {
        cb(res);
      });
    },

insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
        cb(res);
    });
  },

updateOne: function(colVal, condition, cb) {
    orm.updateOne("burgers", colVal, condition, function(res) {
        cb(res);
        });
    },
};

// Export the database functions
module.exports = burger;