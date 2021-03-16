"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = _mongoose["default"].Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 50
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  refreshedToken: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;