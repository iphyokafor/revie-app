"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var ReviewSchema = new Schema({
  messageBody: {
    type: String,
    required: false
  },
  rating: {
    type: Number
  },
  apartmentId: {
    type: Schema.Types.ObjectId,
    ref: "Apartment"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  helpful: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var Review = _mongoose["default"].model("Review", ReviewSchema);

var _default = Review;
exports["default"] = _default;