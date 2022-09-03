const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');

const routesApi = path.join(__dirname, '../api/favs/favs.controller.js');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FAVS API with JS',
      version,
      description: 'FAVS API with JS Documentation',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'Carlos Beltrán R',
        url: 'https://linkedin.com/majortomate',
        email: 'cajaberu18@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8085/',
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        favsResponse: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'name of the fav list',
              example: 'List 1',
            },
            favItem: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'title of the fav',
                    example: 'My first fav',
                  },
                  description: {
                    type: 'string',
                    description: 'description of the fav',
                    example: 'This is my fav',
                  },
                  link: {
                    type: 'string',
                    description: 'link of the fav',
                    example: 'http://google.com',
                  },
                },
              },
            },
          },
        },
        allFavsResponse: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'name of the fav list',
                example: 'List 1',
              },
              favItem: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      description: 'title of the fav',
                      example: 'My first fav',
                    },
                    description: {
                      type: 'string',
                      description: 'description of the fav',
                      example: 'This is my fav',
                    },
                    link: {
                      type: 'string',
                      description: 'link of the fav',
                      example: 'http://google.com',
                    },
                  },
                },
              },
            },
          },
        },
        favNotFound: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message of the error',
              example: 'favs not found',
            },
          },
        },
        unauthorized: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message of the error',
              example: 'No token',
            },
          },
        },
        success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message of the error',
              example: 'fav Successfully created',
            },
          },
        },
        badRequest: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message of the error',
              example: 'Bad request',
            },
            errors: {
              type: 'array',
              description: 'Errors of the request',
              example: [
                {
                  field: 'email',
                  message: 'Email is required',
                },
              ],
            },
          },
        },
        serverError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message of the error',
              example: 'Internal server error',
            },
          },
        },
      },
      requestBodies: {
        favsRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'name of the fav list',
              example: 'List 1',
            },
            favItem: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                    description: 'title of the fav',
                    example: 'My first fav',
                  },
                  description: {
                    type: 'string',
                    description: 'description of the fav',
                    example: 'This is my fav',
                  },
                  link: {
                    type: 'string',
                    description: 'link of the fav',
                    example: 'http://google.com',
                  },
                },
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
    },
  },
  apis: [routesApi], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs running on http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
