import UsersController from "./controllers/users.controller";

exports.routesConfig = function (app) {
  app.post("/users", [UsersController.insert]);

  app.get("/users/:userId", [UsersController.getById]);
};
