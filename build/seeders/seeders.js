"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker = _interopRequireDefault(require("faker"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../Models/user"));

var _apartment = _interopRequireDefault(require("../Models/apartment"));

var _jwt = _interopRequireDefault(require("../helpers/utils/jwt"));

var _bcrypt = _interopRequireDefault(require("../helpers/utils/bcrypt"));

var generateToken = _jwt["default"].generateToken,
    refreshToken = _jwt["default"].refreshToken,
    verifyRefreshToken = _jwt["default"].verifyRefreshToken;
var hashPassword = _bcrypt["default"].hashPassword;

_dotenv["default"].config(); // connection to mongodb


var connect = function connect() {
  /** connection mongodb */
  _mongoose["default"].connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(function () {
    console.log("mongodb connected...");
  })["catch"](function (err) {
    return console.log(err.message);
  });

  _mongoose["default"].connection.on("connected", function () {
    console.log("Mongoose connected to db");
  });
}; // Drop existing users if any


var userModelSeed = function userModelSeed() {
  return _user["default"].deleteMany({});
}; // Drop existing apartment if any


var apartmentModelSeed = function apartmentModelSeed() {
  return _apartment["default"].deleteMany({});
};

var Seeders = {
  seedUserModel: function seedUserModel() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var users, i, firstName, lastName, pass, password, newUser, token, refreshedToken;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // make a bunch of users
              users = [];

              for (i = 0; i < 5; i += 1) {
                firstName = _faker["default"].name.firstName();
                lastName = _faker["default"].name.lastName();
                pass = "password";
                password = hashPassword(pass);
                newUser = {
                  email: _faker["default"].internet.email(firstName, lastName),
                  firstName: firstName,
                  lastName: lastName,
                  password: password
                };
                users.push(newUser);
              }

              _context.next = 5;
              return generateToken({
                users: users
              });

            case 5:
              token = _context.sent;
              _context.next = 8;
              return refreshToken({
                users: users
              });

            case 8:
              refreshedToken = _context.sent;
              _context.next = 11;
              return _user["default"].insertMany(users);

            case 11:
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.log("error", _context.t0);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }))();
  },
  seedApartmentModel: function seedApartmentModel() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var apartment, i, address, amenities, photo, video, apartmentType, apartmentCategory, newApartment;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // make a bunch of apartment
              apartment = [];

              for (i = 0; i < 5; i += 1) {
                address = _faker["default"].address.streetAddress();
                amenities = "Water supply";
                photo = _faker["default"].image.city();
                video = _faker["default"].image.city();
                apartmentType = "Residential";
                apartmentCategory = "Self-contain";
                newApartment = {
                  address: address,
                  amenities: amenities,
                  photo: photo,
                  video: video,
                  apartmentType: apartmentType,
                  apartmentCategory: apartmentCategory
                };
                apartment.push(newApartment);
              }

              _context2.next = 5;
              return _apartment["default"].insertMany(apartment);

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log("error", _context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }))();
  }
};

var migration = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return connect();

          case 3:
            _context3.next = 5;
            return userModelSeed();

          case 5:
            _context3.next = 7;
            return apartmentModelSeed();

          case 7:
            _context3.next = 9;
            return Seeders.seedApartmentModel();

          case 9:
            _context3.next = 11;
            return Seeders.seedUserModel();

          case 11:
            console.log("db migration successful");
            _context3.next = 17;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](0);
            console.log("error", _context3.t0);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 14]]);
  }));

  return function migration() {
    return _ref.apply(this, arguments);
  };
}();

migration();