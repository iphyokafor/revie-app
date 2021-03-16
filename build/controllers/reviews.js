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

var _apartment = _interopRequireDefault(require("../Models/apartment"));

var _review = _interopRequireDefault(require("../Models/review"));

var reviewController = /*#__PURE__*/function () {
  function reviewController() {
    (0, _classCallCheck2["default"])(this, reviewController);
  }

  (0, _createClass2["default"])(reviewController, null, [{
    key: "postReview",
    value: function () {
      var _postReview = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
        var _request$body, messageBody, rating, helpful, userId, review, savedReview;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // eslint-disable-next-line object-curly-newline
                _request$body = request.body, messageBody = _request$body.messageBody, rating = _request$body.rating, helpful = _request$body.helpful, userId = _request$body.userId;
                _context.next = 4;
                return new _review["default"]({
                  messageBody: messageBody,
                  rating: rating,
                  helpful: helpful,
                  apartmentId: request.params.apartmentId,
                  userId: request.decoded._id
                });

              case 4:
                review = _context.sent;
                console.log(review);
                _context.next = 8;
                return _apartment["default"].updateOne({
                  $push: {
                    reviews: review._id
                  }
                });

              case 8:
                _context.next = 10;
                return review.save();

              case 10:
                savedReview = _context.sent;
                return _context.abrupt("return", response.status(201).json({
                  message: "Successfully added Review",
                  savedReview: savedReview
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                next(_context.t0);
                console.log("error", _context.t0);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 14]]);
      }));

      function postReview(_x, _x2, _x3) {
        return _postReview.apply(this, arguments);
      }

      return postReview;
    }()
  }]);
  return reviewController;
}();

exports["default"] = reviewController;