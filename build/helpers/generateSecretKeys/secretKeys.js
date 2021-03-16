"use strict";

var crypto = require("crypto");

var key1 = crypto.randomBytes(32).toString("hex"); // JWT_KEY

var key2 = crypto.randomBytes(32).toString("hex"); // REFRESH_TOKEN

console.table({
  key1: key1,
  key2: key2
});