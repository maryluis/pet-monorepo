"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerSpec = void 0;
Object.defineProperty(exports, "swaggerUi", {
  enumerable: true,
  get: function get() {
    return _swaggerUiExpress["default"];
  }
});
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var path = require('path');
var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js app'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [{
      name: 'Auth',
      description: 'User authentication'
    }, {
      name: 'Followers'
    }, {
      name: 'Users',
      description: 'Operations related to users'
    }, {
      name: 'Wishes',
      description: 'Create and manage wishes'
    }]
  },
  apis: [path.join(__dirname, 'routes/*')]
};
var swaggerSpec = exports.swaggerSpec = (0, _swaggerJsdoc["default"])(options);