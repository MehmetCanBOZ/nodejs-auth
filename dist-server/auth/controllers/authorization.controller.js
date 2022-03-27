"use strict";

var _env = _interopRequireDefault(require("../../common/config/env.config"));

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.login = function (req, res) {
  try {
    var refreshId = req.body.userId + _env["default"].jwt_secret;

    var salt = _crypto["default"].randomBytes(16).toString("base64");

    var hash = _crypto["default"].createHmac("sha512", salt).update(refreshId).digest("base64");

    req.body.refreshKey = salt;

    var token = _jsonwebtoken["default"].sign(req.body, _env["default"].jwt_secret);

    var b = Buffer.from(hash);
    var refresh_token = b.toString("base64");
    res.status(201).send({
      accessToken: token,
      refreshToken: refresh_token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
};

exports.refresh_token = function (req, res) {
  try {
    req.body = req.jwt;

    var token = _jsonwebtoken["default"].sign(req.body, _env["default"].jwt_secret);

    res.status(201).send({
      id: token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
};