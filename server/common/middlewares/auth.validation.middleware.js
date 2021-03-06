const jwt = require("jsonwebtoken");
const secret = require("../config/env.config.js").jwt_secret;
const crypto = require("crypto");

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({ error: "need to pass refresh_token field" });
  }
};

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");

      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(req.body.refresh_token, secret);

        return next();
      }
    } catch (err) {
      return res.status(403).send({ error: "Invalid refresh token" });
    }
  } else {
    return res.status(401).send();
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  let b = Buffer.from(req.jwt.refreshKey, "base64");

  let refresh_token = b.toString();

  let hash = crypto
    .createHmac("sha512", req.jwt.saltKey)
    .update(req.jwt.userId + secret)
    .digest("base64");

  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({ error: "Invalid refresh token" });
  }
};
