import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my Node.js app',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'User authentication' },
      { name: 'Followers' },
      { name: 'Users', description: 'Operations related to users' },
      { name: 'Wishes', description: 'Create and manage wishes' },
    ],
  },
  apis: [path.join(__dirname, 'routes/*')]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
