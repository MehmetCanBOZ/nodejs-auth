import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import cors from "cors";
import UsersRouter from "./users/routes.config";
import connectMongoDb from "./service/service";

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

UsersRouter.routesConfig(app);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err :", err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

connectMongoDb();

module.exports = app;
