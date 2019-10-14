// Import MySQL connection
var connection = require("../config/connection.js");

// Helper function to convert object to SQL
function questionMark(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
      }
    
      return arr.toString();
    }

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
    var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
          }
        }
        return arr.toString();
      }

// Start the Orm functions
var orm = {
    selectAll: function (table, cb) {
      var queryString = "SELECT * FROM " + table + ";"
      connection.query(queryString, function (err, response) {
        if (err) throw err;
        cb(response);
      })
    },

insertOne: function(table, cols, vals, cb) {
var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += questionMark(vals.length);
    queryString += ") ";

connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

// Update
update: function(table, objColVals, condition, cb) {
var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

// Export the orm object
module.exports = orm;