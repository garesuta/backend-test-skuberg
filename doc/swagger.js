require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Exchange API',
            version: '1.0.0',
            description: 'API documentation for Skuberg test, You can test the API here by simply press and run the API with the given parameters',
        },
        servers: [
            {
                // url: `http://localhost:${process.env.PORT}`, // Replace with your server URL
                url: `${process.env.DEPLOY_URL}`, // Replace with your server URL
            },
        ],
    },
    apis: ['./router/Router.js'], // Path to the API docs
};

module.exports = swaggerJsDoc(swaggerOptions);