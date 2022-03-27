"use strict";

var _verifyUser = _interopRequireDefault(require("./middlewares/verify.user.middleware"));

var _authorization = _interopRequireDefault(require("./controllers/authorization.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

exports.routesConfig = function (app) {
  app.post("/auth", [_verifyUser["default"].hasAuthValidFields, _verifyUser["default"].isPasswordAndUserMatch, _authorization["default"].login]);
  app.post("/auth/refresh", [AuthValidationMiddleware.validJWTNeeded, AuthValidationMiddleware.verifyRefreshBodyField, AuthValidationMiddleware.validRefreshNeeded, _authorization["default"].login]);
};