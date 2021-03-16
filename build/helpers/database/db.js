"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  console.log("mongodb connected...");
})["catch"](function (err) {
  return console.log(err.message);
});

_mongoose["default"].connection.on("connected", function () {
  console.log("Mongoose connected to db");
});