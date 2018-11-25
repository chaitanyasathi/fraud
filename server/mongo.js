const keys = require('./keys');
const mongoose = require("mongoose");

const host = keys.mongoHost;
const port = keys.mongoPort;
const name = keys.mongoDB;
const conString = 'mongodb://'+host+':'+port +'/'+ name;
mongoose.connect(
  conString,
  { useNewUrlParser: true },
  err => {
    if (!err) console.log("MongoDB connection succeeded.");
    else
      console.log(
        "Error in DB connection : " + JSON.stringify(err, undefined, 2)
      );
      console.log(conString);
      console.log(name);
  }
);

// create instance of Schema
var mongoSchema = mongoose.Schema;
// create schema
var fraudSchema = {
  session: String,
  ip: String,
  user_id: String,
  time: Number,
  weekday: String,
  age: Number,
  gender: Number,
  isFraud: String,
  X1: Number,
  X2: Number,
  X3: Number
};
// create model if not exists.
var mongomodel = mongoose.model("fraud", fraudSchema, "fraud");
module.exports = mongomodel;
