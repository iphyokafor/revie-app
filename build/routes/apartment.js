"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _apartment = _interopRequireDefault(require("../controllers/apartment"));

var fileUpload = require("express-fileupload");

var postApartment = _apartment["default"].postApartment,
    getApartment = _apartment["default"].getApartment;
var router = new _express.Router();
router.post("/apartment", fileUpload({
  useTempFiles: true,
  limits: {
    fileSize: 50 * 1024 * 1024
  }
}), postApartment);
router.get("/apartment", getApartment);
var _default = router;
exports["default"] = _default;