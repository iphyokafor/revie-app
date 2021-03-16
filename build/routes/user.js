"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user"));

var registerUsers = _user["default"].registerUsers,
    loginUsers = _user["default"].loginUsers,
    refreshTokenUser = _user["default"].refreshTokenUser;
var router = new _express.Router();
router.post("/register", registerUsers);
router.post("/login", loginUsers);
router.post("/refresh-token", refreshTokenUser);
var _default = router;
exports["default"] = _default;