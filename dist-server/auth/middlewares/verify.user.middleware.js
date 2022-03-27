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

exports.isPasswordAndUserMatch = function (req, res, next) {
  _users["default"].findByEmail(req.body.email).then(function (user) {
    if (!user[0]) {
      res.status(404).send({});
    } else {
      var passwordFields = user[0].password.split("$");
      var salt = passwordFields[0];

      var hash = _crypto["default"].createHmac("sha512", salt).update(req.body.password).digest("base64");

      if (hash === passwordFields[1]) {
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          provider: "email",
          name: user[0].firstName + " " + user[0].lastName
        };
        return next();
      } else {
        return res.status(400).send({
          errors: ["Invalid e-mail or password"]
        });
      }
    }
  });
};