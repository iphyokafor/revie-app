"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var verifyToken = function verifyToken(request, response, next) {
  var token = request.headers["x-access-token"] || request.headers["authorization"]; // eslint-disable-next-line prefer-const

  var checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }

    _jsonwebtoken["default"].verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        response.json({
          success: false,
          message: "Failed to authenticate"
        });
      } else {
        request.decoded = decoded;
        next();
      }
    });
  } else {
    return next(_httpErrors["default"].Unauthorized());
  }
};

var _default = verifyToken;
exports["default"] = _default;