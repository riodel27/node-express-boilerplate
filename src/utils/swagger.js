const swaggerJSDoc = require('swagger-jsdoc');

const {
  version,
  name,
  description,
} = require('../../package.json');

const api = {
  '/user': {
    post: {
      tags: ['api'],
      operationId: 'RegisterUser',
      summary: 'register user',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  require: true,
                  example: '',
                },
                password: {
                  type: 'string',
                  require: true,
                  example: '',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Ok',
        },
        401: {
          $ref: '#/components/responses/UnAuthorizedError',
        },
      },
    },
  },
};

// https://editor.swagger.io/
const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: name,
    version,
    description,
  },
  host: 'localhost:3000',
  basePath: '/',
  tags: [],
  paths: {
    ...api,
  },
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    responses: {
      UnAuthorizedError: {
        description: 'Access token is missing or invalid',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['../api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
