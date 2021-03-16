"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _reviews = _interopRequireDefault(require("../controllers/reviews"));

var _verifyToken = _interopRequireDefault(require("../middlewares/verify-token"));

var postReview = _reviews["default"].postReview;
var router = new _express.Router();
router.post("/review/:apartmentId", _verifyToken["default"], postReview);
var _default = router;
exports["default"] = _default;