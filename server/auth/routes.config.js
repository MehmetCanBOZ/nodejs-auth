import VerifyUserMiddleWare from "./middlewares/verify.user.middleware";
import AuthorizationController from "./controllers/authorization.controller";
const AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

exports.routesConfig = function (app) {
  app.post("/auth", [
    VerifyUserMiddleWare.hasAuthValidFields,
    VerifyUserMiddleWare.isPasswordAndUserMatch,
    AuthorizationController.login,
  ]);

  app.post("/auth/refresh", [
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.refresh_token,
  ]);
};
