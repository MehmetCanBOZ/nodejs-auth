"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

var User = _mongoose["default"].model("Users", userSchema);

exports.createUser = function (userData) {
  var user = new User(userData);
  return user.save();
};

exports.findById = function (id) {
  return User.findById(id).then(function (result) {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.findByEmail = function (email) {
  return User.find({
    email: email
  });
};