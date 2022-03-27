"use strict";

var jwt = require("jsonwebtoken");

var secret = require("../config/env.config.js").jwt_secret;

var crypto = require("crypto");

exports.validJWTNeeded = function (req, res, next) {
  if (req.headers["authorization"]) {
    try {
      var authorization = req.headers["authorization"].split(" ");

      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};

exports.verifyRefreshBodyField = function (req, res, next) {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({
      error: "need to pass refresh_token field"
    });
  }
};

exports.validRefreshNeeded = function (req, res, next) {
  var b = Buffer.from(req.body.refresh_token, "base64");
  var refresh_token = b.toString();
  var hash = crypto.createHmac("sha512", req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");

  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({
      error: "Invalid refresh token"
    });
  }
};