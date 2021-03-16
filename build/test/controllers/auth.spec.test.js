"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../../server"));

var _userTest = require("./user.test.data");

var _loginTest = require("./login.test.data");

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var url = "/api/v1";
describe("Authentication Endpoint", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          describe("it should register a user", function () {
            it("it should register a user successfully", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/register")).set("Accept", "application/json").send(_userTest.user).end(function (err, response) {
                response.body.should.be.a("object");
                done();
              });
            });
            it("it should not register a user with incomplete details", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/register")).set("Accept", "application/json").send(_userTest.user2).end(function (err, response) {
                response.should.have.status(422);
                done();
              });
            });
            it("it should not register a user with email already in use", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/register")).set("Accept", "application/json").send(_userTest.user3).end(function (err, response) {
                response.should.have.status(409);
                response.body.should.be.a("object");
                done();
              });
            });
          });
          describe("it should login a user", function () {
            it("it should login a user successfully", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/login")).set("Accept", "application/json").send(_loginTest.login).end(function (err, response) {
                response.body.should.be.a("object");
                done();
              });
            });
            it("it should not login a user with incomplete details", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/login")).set("Accept", "application/json").send(_loginTest.login2).end(function (err, response) {
                response.should.have.status(400);
                done();
              });
            });
            it("it should not login a user without email and password", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/login")).set("Accept", "application/json").send(_loginTest.login3).end(function (err, response) {
                response.should.have.status(400);
                done();
              });
            });
          });
          describe("it should verify refreshToken", function () {
            it("it should create a refreshToken and accessToken", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/refresh-token")).set("Accept", "application/json").send(_loginTest.refreshToken).end(function (err, response) {
                response.body.should.be.a("object");
                done();
              });
            });
            it("no refresh token", function (done) {
              _chai["default"].request(_server["default"]).post("".concat(url, "/refresh-token")).set("Accept", "application/json").send(_loginTest.refreshToken2).end(function (err, response) {
                response.should.have.status(400);
                done();
              });
            });
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));