import config from "../../common/config/env.config";
import crypto from "crypto";
import jwt from "jsonwebtoken";

exports.login = (req, res) => {
  try {
    let refreshId = req.body.userId + config.jwt_secret;
    let salt = crypto.randomBytes(16).toString("base64");

    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");

    let b = Buffer.from(hash);

    let refresh_key = b.toString("base64");

    if (req.body?.exp || req.body?.iat) {
      delete req.body?.exp;
      delete req.body?.iat;
    }

    let token = jwt.sign(req.body, config.jwt_secret, {
      expiresIn: "5000",
    });

    req.body.saltKey = salt;
    req.body.refreshKey = refresh_key;

    let refreshToken = jwt.sign(req.body, config.jwt_secret, {
      expiresIn: "20000",
    });

    res.status(201).send({ accessToken: token, refreshToken: refreshToken });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

exports.refresh_token = (req, res) => {
  try {
    delete req.jwt?.exp;
    delete req.jwt?.iat;
    delete req.jwt?.salt;
    delete req.jwt?.refresh_key;

    req.body = req.jwt;
    let token = jwt.sign(req.body, config.jwt_secret, {
      expiresIn: "5000",
    });
    res.status(201).send({ id: token });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
