"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var ApartmentSchema = new Schema({
  address: {
    type: String,
    required: false
  },
  amenities: [{
    type: String,
    required: true,
    "enum": ["Security", "Power supply", "Water supply", "POP ceiling", "Lounge", "Swimming pool"],
    "default": ["Security", "Water supply"]
  }],
  photo: {
    type: String,
    required: false
  },
  video: {
    type: String,
    required: false
  },
  apartmentType: {
    type: String,
    "enum": ["Residential", "Commercial"],
    "default": "Residential",
    required: false
  },
  apartmentCategory: {
    type: String,
    "enum": ["Self-contain", "1 bedroom", "2 bedroom", "3 bedroom", "Duplex"],
    "default": "1 bedroom"
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }]
}, {
  timestamps: true
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
}); // eslint-disable-next-line func-names

ApartmentSchema.virtual("averageRating").get(function () {
  if (this.reviews.length > 0) {
    var sum = this.reviews.reduce(function (total, review) {
      console.log("Review", review);
      return total + review.rating;
    }, 0);
    return sum / this.reviews.length;
  }

  return 0;
});

var Apartment = _mongoose["default"].model("Apartment", ApartmentSchema);

var _default = Apartment;
exports["default"] = _default;