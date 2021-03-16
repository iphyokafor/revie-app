"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var bcryptHelper = /*#__PURE__*/function () {
  function bcryptHelper() {
    (0, _classCallCheck2["default"])(this, bcryptHelper);
  }

  (0, _createClass2["default"])(bcryptHelper, null, [{
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
    }
  }, {
    key: "comparePassword",
    value: function comparePassword(hashPassword, password) {
      return _bcryptjs["default"].compareSync(password, hashPassword);
    }
  }]);
  return bcryptHelper;
}();

exports["default"] = bcryptHelper;