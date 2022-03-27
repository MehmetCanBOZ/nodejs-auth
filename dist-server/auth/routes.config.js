"use strict";

var _verifyUser = _interopRequireDefault(require("./middlewares/verify.user.middleware"));

var _authorization = _interopRequireDefault(require("./controllers/authorization.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.routesConfig = function (app) {
  app.post("/auth", [_verifyUser["default"].hasAuthValidFields, _verifyUser["default"].isPasswordAndUserMatch, _authorization["default"].login]);
};