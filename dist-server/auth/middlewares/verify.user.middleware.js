"use strict";

var _users = _interopRequireDefault(require("../../users/models/users.model"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.hasAuthValidFields = function (req, res, next) {
  var errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing Email field");
    }

    if (!req.body.password) {
      errors.push("Missing password field");
    }

    if (errors.length) {
      return res.status(400).send({
        errors: errors.join(",")
      });
    } else {
      return next();
    }
  } else {
    return res.status(400).send({
      errors: "Missing email and password fields"
    });
  }
};