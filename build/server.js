"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./routes/index"));

require("./helpers/database/db");

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use("/api", _index["default"]);
app.get("/", function (request, response) {
  response.status(200).json({
    status: true,
    message: "Revie App API"
  });
});
app.use(function (request, response, next) {
  next(_httpErrors["default"].NotFound());
});
app.use(function (err, request, response, next) {
  response.status(err.status || 500);
  response.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});
var PORT = process.env.PORT || 4003;
app.listen(PORT, function () {
  console.log("Server running at: http://localhost:".concat(PORT));
});
var _default = app;
exports["default"] = _default;