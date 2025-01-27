"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var sequelize = new _sequelize.Sequelize(process.env.DATABASE_URL, {
  logging: false
});
sequelize.authenticate().then(function () {
  console.log('Connected to PostgreSQL using Sequelize works!');
})["catch"](function (err) {
  console.error('Connection error', err.stack);
});
var _default = exports["default"] = sequelize;