"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

var connectMongoDb = function connectMongoDb() {
  _mongoose["default"].connect("mongodb+srv://mcboz:Mehmet1997@cluster0.gl215.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", options).then(function () {
    console.log("MongoDb connected");
  })["catch"](function (err) {
    console.log("MongoDb connection unseccussfull");
  });
};

var _default = connectMongoDb;
exports["default"] = _default;