import UsersController from "./controllers/users.controller";

exports.routesConfig = function (app) {
  app.post("/signIn", [UsersController.insert]);

  app.get("/users/:userId", [UsersController.getById]);
};
