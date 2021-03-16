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

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _user = _interopRequireDefault(require("../Models/user"));

var _user2 = require("../helpers/validation/user");

var _jwt = _interopRequireDefault(require("../helpers/utils/jwt"));

var _bcrypt = _interopRequireDefault(require("../helpers/utils/bcrypt"));

var generateToken = _jwt["default"].generateToken,
    refreshToken = _jwt["default"].refreshToken,
    verifyRefreshToken = _jwt["default"].verifyRefreshToken;
var hashPassword = _bcrypt["default"].hashPassword,
    comparePassword = _bcrypt["default"].comparePassword;

var userController = /*#__PURE__*/function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }

  (0, _createClass2["default"])(userController, null, [{
    key: "registerUsers",
    value: function () {
      var _registerUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
        var result, emailExist, user, token, refreshedToken;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _user2.authSchema.validateAsync(request.body);

              case 3:
                result = _context.sent;
                _context.next = 6;
                return hashPassword(result.password);

              case 6:
                result.password = _context.sent;
                _context.next = 9;
                return _user["default"].findOne({
                  email: result.email
                });

              case 9:
                emailExist = _context.sent;

                if (!emailExist) {
                  _context.next = 12;
                  break;
                }

                throw _httpErrors["default"].Conflict("".concat(result.email, " is already in use"));

              case 12:
                user = new _user["default"](result);
                _context.next = 15;
                return user.save();

              case 15:
                _context.next = 17;
                return generateToken({
                  user: user
                });

              case 17:
                token = _context.sent;
                _context.next = 20;
                return refreshToken({
                  user: user
                });

              case 20:
                refreshedToken = _context.sent;
                response.send({
                  message: "welcome to Your Revie App",
                  accessToken: token,
                  refreshToken: refreshedToken
                });
                _context.next = 28;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](0);
                if (_context.t0.isJoi === true) _context.t0.status = 422;
                next(_context.t0);

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 24]]);
      }));

      function registerUsers(_x, _x2, _x3) {
        return _registerUsers.apply(this, arguments);
      }

      return registerUsers;
    }()
  }, {
    key: "loginUsers",
    value: function () {
      var _loginUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
        var result, user, match, token, refreshedToken;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _user2.loginSchema.validateAsync(request.body);

              case 3:
                result = _context2.sent;
                _context2.next = 6;
                return _user["default"].findOne({
                  email: result.email
                });

              case 6:
                user = _context2.sent;

                if (user) {
                  _context2.next = 9;
                  break;
                }

                throw _httpErrors["default"].NotFound("User not registered");

              case 9:
                _context2.next = 11;
                return comparePassword(user.password, result.password);

              case 11:
                match = _context2.sent;

                if (!match) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 15;
                return generateToken({
                  user: user
                });

              case 15:
                token = _context2.sent;
                _context2.next = 18;
                return refreshToken({
                  user: user
                });

              case 18:
                refreshedToken = _context2.sent;
                response.cookie("token", token);
                response.send({
                  message: "Logged in!",
                  user: user,
                  accessToken: token,
                  refreshToken: refreshedToken
                });
                _context2.next = 24;
                break;

              case 23:
                throw _httpErrors["default"].Unauthorized("Email/password not valid");

              case 24:
                _context2.next = 31;
                break;

              case 26:
                _context2.prev = 26;
                _context2.t0 = _context2["catch"](0);

                if (!(_context2.t0.isJoi === true)) {
                  _context2.next = 30;
                  break;
                }

                return _context2.abrupt("return", next(_httpErrors["default"].BadRequest("Invalid Email/password")));

              case 30:
                next(_context2.t0);

              case 31:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 26]]);
      }));

      function loginUsers(_x4, _x5, _x6) {
        return _loginUsers.apply(this, arguments);
      }

      return loginUsers;
    }()
  }, {
    key: "refreshTokenUser",
    value: function () {
      var _refreshTokenUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(request, response, next) {
        var refreshedToken, user, token, refresh;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                refreshedToken = request.body.refreshedToken;

                if (refreshedToken) {
                  _context3.next = 4;
                  break;
                }

                throw _httpErrors["default"].BadRequest();

              case 4:
                _context3.next = 6;
                return verifyRefreshToken(refreshedToken);

              case 6:
                user = _context3.sent;
                _context3.next = 9;
                return generateToken({
                  user: user
                });

              case 9:
                token = _context3.sent;
                _context3.next = 12;
                return refreshToken({
                  user: user
                });

              case 12:
                refresh = _context3.sent;
                response.send({
                  accessToken: token,
                  refreshToken: refresh
                });
                _context3.next = 19;
                break;

              case 16:
                _context3.prev = 16;
                _context3.t0 = _context3["catch"](0);
                next(_context3.t0);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 16]]);
      }));

      function refreshTokenUser(_x7, _x8, _x9) {
        return _refreshTokenUser.apply(this, arguments);
      }

      return refreshTokenUser;
    }()
  }]);
  return userController;
}();

exports["default"] = userController;