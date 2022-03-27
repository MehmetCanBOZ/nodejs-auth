"use strict";

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./users/routes.config"));

var _routes2 = _interopRequireDefault(require("./auth/routes.config"));

var _service = _interopRequireDefault(require("./service/service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());

_routes["default"].routesConfig(app);

_routes2["default"].routesConfig(app); // catch 404 and forward to error handler


app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err :", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.json({
    error: err
  });
});
(0, _service["default"])();
module.exports = app;