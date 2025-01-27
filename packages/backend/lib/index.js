"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("reflect-metadata");
var path = _interopRequireWildcard(require("path"));
var _moduleAlias = _interopRequireDefault(require("module-alias"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _swagger = require("./swagger");
var _routes = require("./routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
_moduleAlias["default"].addAliases({
  '@shared': path.resolve(__dirname, '.../../'),
  '@': path.resolve(__dirname, './packages/backend/src')
});
_dotenv["default"].config();
var app = (0, _express["default"])();
var port = 3001;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use('/api-docs', _swagger.swaggerUi.serve, _swagger.swaggerUi.setup(_swagger.swaggerSpec));
app.get('/', function (req, res) {
  res.json({
    message: 'Hello from Ukraine!'
  });
});
app.use('', _routes.userRoutes);
app.use('', _routes.wishRoutes);
app.use('', _routes.followerRouters);
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});