"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe("/ should display Revie App API", function () {
  it("it should get the home page", function (done) {
    _chai["default"].request(_server["default"]).get("/").end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
  it("it should return 404 error not found for no existing routes", function (done) {
    _chai["default"].request(_server["default"]).get("/abc_zyx").end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
});
var _default = describe;
exports["default"] = _default;