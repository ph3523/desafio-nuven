const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Nuven - Desafio',
      version: '1.0.0',
      description: 'Documentação da API para o desafio técnico Nuven',
      contact: {
        name: 'Desenvolvedor',
        email: 'contato@exemplo.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            senha_hash: { type: 'string' }
          }
        },
        Dataset: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            usuario_id: { type: 'integer' },
            criado_em: { type: 'string', format: 'date-time' }
          }
        },
        Record: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            dataset_id: { type: 'integer' },
            dados_json: { type: 'object' }
          }
        },
        Query: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            dataset_id: { type: 'integer' },
            pergunta: { type: 'string' },
            resposta: { type: 'string' },
            criado_em: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Documentação Swagger disponível em http://localhost:3001/api-docs`);
};

module.exports = swaggerDocs;