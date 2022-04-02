"use strict";

var _env = _interopRequireDefault(require("../../common/config/env.config"));

var _crypto = _interopRequireDefault(require("crypto"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.login = function (req, res) {
  try {
    var _req$body, _req$body2;

    var refreshId = req.body.userId + _env["default"].jwt_secret;

    var salt = _crypto["default"].randomBytes(16).toString("base64");

    var hash = _crypto["default"].createHmac("sha512", salt).update(refreshId).digest("base64");

    var b = Buffer.from(hash);
    var refresh_key = b.toString("base64");

    if ((_req$body = req.body) !== null && _req$body !== void 0 && _req$body.exp || (_req$body2 = req.body) !== null && _req$body2 !== void 0 && _req$body2.iat) {
      var _req$body3, _req$body4;

      (_req$body3 = req.body) === null || _req$body3 === void 0 ? true : delete _req$body3.exp;
      (_req$body4 = req.body) === null || _req$body4 === void 0 ? true : delete _req$body4.iat;
    }

    var token = _jsonwebtoken["default"].sign(req.body, _env["default"].jwt_secret, {
      expiresIn: "5000"
    });

    req.body.saltKey = salt;
    req.body.refreshKey = refresh_key;

    var refreshToken = _jsonwebtoken["default"].sign(req.body, _env["default"].jwt_secret, {
      expiresIn: "20000"
    });

    res.status(201).send({
      accessToken: token,
      refreshToken: refreshToken
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
};

exports.refresh_token = function (req, res) {
  try {
    var _req$jwt, _req$jwt2, _req$jwt3, _req$jwt4;

    (_req$jwt = req.jwt) === null || _req$jwt === void 0 ? true : delete _req$jwt.exp;
    (_req$jwt2 = req.jwt) === null || _req$jwt2 === void 0 ? true : delete _req$jwt2.iat;
    (_req$jwt3 = req.jwt) === null || _req$jwt3 === void 0 ? true : delete _req$jwt3.salt;
    (_req$jwt4 = req.jwt) === null || _req$jwt4 === void 0 ? true : delete _req$jwt4.refresh_key;
    req.body = req.jwt;

    var token = _jsonwebtoken["default"].sign(req.body, _env["default"].jwt_secret, {
      expiresIn: "5000"
    });

    res.status(201).send({
      id: token
    });
  } catch (err) {
    res.status(500).send({
      errors: err
    });
  }
};