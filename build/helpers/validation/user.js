"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = exports.authSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var authSchema = _joi["default"].object({
  firstName: _joi["default"].string().required().min(3).max(255).empty().messages({
    "any.required": "Sorry, name is required",
    "string.empty": "name cannot be an empty field",
    "string.min": "name should have a minimum length of 3 and a maximum length of 255"
  }),
  lastName: _joi["default"].string().required().min(3).max(255).empty().messages({
    "any.required": "Sorry, name is required",
    "string.empty": "name cannot be an empty field",
    "string.min": "name should have a minimum length of 3 and a maximum length of 255"
  }),
  email: _joi["default"].string().required().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "uk", "co", "io"]
    }
  }).lowercase().min(5).max(100).empty().messages({
    "any.required": "Sorry, email is required",
    "string.empty": "Sorry, Email cannot be an empty field",
    "string.email": "Please enter a valid email"
  }),
  password: _joi["default"].string().required().empty().min(5).max(1024).regex(/^[a-zA-Z0-9]{3,30}$/).messages({
    "any.required": "Sorry, password is required",
    "string.pattern.base": "password must contain only from a-z or A-Z or 0-9.",
    "string.empty": "Sorry, password cannot be an empty field",
    "string.min": "password should have a minimum length of 5"
  })
});

exports.authSchema = authSchema;

var loginSchema = _joi["default"].object({
  email: _joi["default"].string().required().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net", "uk", "co", "io"]
    }
  }).lowercase().min(5).max(100).empty().messages({
    "any.required": "Sorry, email is required",
    "string.empty": "Sorry, Email cannot be an empty field",
    "string.email": "Please enter a valid email"
  }),
  password: _joi["default"].string().required().empty().min(5).max(1024).regex(/^[a-zA-Z0-9]{3,30}$/).messages({
    "any.required": "Sorry, password is required",
    "string.pattern.base": "password must contain only from a-z or A-Z or 0-9.",
    "string.empty": "Sorry, password cannot be an empty field",
    "string.min": "password should have a minimum length of 5"
  })
});

exports.loginSchema = loginSchema;