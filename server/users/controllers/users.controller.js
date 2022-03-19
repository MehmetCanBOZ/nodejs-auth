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
    console.log("!result.length :", result);
    if (result.length) {
      res.json({ error: "Aynı emaille başka kullancı giriş yapamaz" });
    } else {
      UserModel.createUser(req.body).then((result) => {
        res.status(201).send({ id: result._id });
      });
      console.log("adasda");
    }
  });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};
