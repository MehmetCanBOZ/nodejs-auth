"use strict";

var _crypto = _interopRequireDefault(require("crypto"));

var _users = _interopRequireDefault(require("../models/users.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.insert = function (req, res) {
  var salt = _crypto["default"].randomBytes(16).toString("base64");

  var hash = _crypto["default"].createHmac("sha512", salt).update(req.body.password).digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;

  _users["default"].findByEmail(req.body.email).then(function (result) {
    console.log("!result.length :", result);

    if (result.length) {
      res.json({
        error: "Aynı emaille başka kullancı giriş yapamaz"
      });
    } else {
      _users["default"].createUser(req.body).then(function (result) {
        res.status(201).send({
          id: result._id
        });
      });

      console.log("adasda");
    }
  });
};

exports.getById = function (req, res) {
  _users["default"].findById(req.params.userId).then(function (result) {
    res.status(200).send(result);
  });
};