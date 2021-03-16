"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user"));

var _apartment = _interopRequireDefault(require("./apartment"));

var _review = _interopRequireDefault(require("./review"));

var router = new _express.Router();
router.use("/v1", _user["default"]);
router.use("/v1", _apartment["default"]);
router.use("/v1", _review["default"]);
var _default = router;
exports["default"] = _default;