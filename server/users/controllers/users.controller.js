import crypto from "crypto";
import UserModel from "../models/users.model";

exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");

  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  UserModel.findByEmail(req.body.email).then((result) => {
    if (result.length) {
      return res
        .status(400)
        .send({ errors: ["This email has been used before"] });
    } else {
      UserModel.createUser(req.body).then((result) => {
        res.status(201).send({ user: result });
      });
    }
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send({ user: result });
  });
};
