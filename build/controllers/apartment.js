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

var apartmentController = /*#__PURE__*/function () {
  function apartmentController() {
    (0, _classCallCheck2["default"])(this, apartmentController);
  }

  (0, _createClass2["default"])(apartmentController, null, [{
    key: "postApartment",
    value: function () {
      var _postApartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, next) {
        var _request$body, address, amenities, apartmentType, apartmentCategory, apartment, savedData;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _request$body = request.body, address = _request$body.address, amenities = _request$body.amenities, apartmentType = _request$body.apartmentType, apartmentCategory = _request$body.apartmentCategory;
                _context.next = 4;
                return new _apartment["default"]({
                  address: address,
                  amenities: amenities,
                  photo: request.files.photo.name,
                  video: request.files.video.name,
                  apartmentType: apartmentType,
                  apartmentCategory: apartmentCategory
                });

              case 4:
                apartment = _context.sent;
                console.log(apartment);
                _context.next = 8;
                return apartment.save();

              case 8:
                savedData = _context.sent;
                return _context.abrupt("return", response.status(201).json({
                  message: "Apartment details added successfully",
                  savedData: savedData
                }));

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                next(_context.t0);
                console.log("error", _context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function postApartment(_x, _x2, _x3) {
        return _postApartment.apply(this, arguments);
      }

      return postApartment;
    }()
  }, {
    key: "getApartment",
    value: function () {
      var _getApartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(request, response, next) {
        var _request$query, page, limit, count, totalPages, apartment;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _request$query = request.query, page = _request$query.page, limit = _request$query.limit;
                page = page < 1 ? 1 : page;
                limit = 5; // get total documents in the Apartment collection

                _context2.next = 6;
                return _apartment["default"].countDocuments();

              case 6:
                count = _context2.sent;
                // eslint-disable-next-line prefer-const
                totalPages = Math.ceil(count / limit);
                page = page > totalPages ? totalPages : page;
                _context2.next = 11;
                return _apartment["default"].find({
                  __v: 0
                }).limit(limit * 1).skip((page - 1) * limit).populate("reviews").collation({
                  locale: "en"
                }).exec();

              case 11:
                apartment = _context2.sent;
                // return response with apartment, total pages, and current page
                response.status(201).json({
                  message: "All apartments",
                  apartment: apartment,
                  // eslint-disable-next-line object-shorthand
                  totalPages: totalPages,
                  currentPage: page,
                  totalProducts: count
                });
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](0);
                next(_context2.t0);
                console.log("error", _context2.t0);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 15]]);
      }));

      function getApartment(_x4, _x5, _x6) {
        return _getApartment.apply(this, arguments);
      }

      return getApartment;
    }()
  }]);
  return apartmentController;
}();

exports["default"] = apartmentController;