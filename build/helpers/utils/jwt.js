"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var secretKey = process.env.JWT_KEY;
var refreshKey = process.env.REFRESH_TOKEN_KEY;

var jwtHelper = /*#__PURE__*/function () {
  function jwtHelper() {
    (0, _classCallCheck2["default"])(this, jwtHelper);
  }

  (0, _createClass2["default"])(jwtHelper, null, [{
    key: "generateToken",
    value: function () {
      var _generateToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var secret,
            token,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                secret = _args.length > 1 && _args[1] !== undefined ? _args[1] : secretKey;
                _context.next = 3;
                return _jsonwebtoken["default"].sign(payload, secret, {
                  expiresIn: "1d"
                });

              case 3:
                token = _context.sent;
                return _context.abrupt("return", token);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateToken(_x) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(payload) {
        var secret,
            token,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                secret = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : refreshKey;
                _context2.next = 3;
                return _jsonwebtoken["default"].sign(payload, secret, {
                  expiresIn: "7d"
                });

              case 3:
                token = _context2.sent;
                return _context2.abrupt("return", token);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function refreshToken(_x2) {
        return _refreshToken.apply(this, arguments);
      }

      return refreshToken;
    }()
  }, {
    key: "verifyRefreshToken",
    value: function () {
      var _verifyRefreshToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(refreshToken) {
        var token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _jsonwebtoken["default"].verify(refreshToken, refreshKey);

              case 2:
                token = _context3.sent;
                return _context3.abrupt("return", token);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function verifyRefreshToken(_x3) {
        return _verifyRefreshToken.apply(this, arguments);
      }

      return verifyRefreshToken;
    }()
  }]);
  return jwtHelper;
}();

exports["default"] = jwtHelper;