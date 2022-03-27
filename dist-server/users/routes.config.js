"use strict";

var _users = _interopRequireDefault(require("./controllers/users.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.routesConfig = function (app) {
  app.post("/signIn", [_users["default"].insert]);
  app.get("/users/:userId", [_users["default"].getById]);
};