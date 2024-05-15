import swaggerAutogen from 'swagger-autogen';
const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Project Name',
        description: 'Implementation of Swagger with TypeScript'
    },
    servers: [
        {
            url: 'http://localhost:[your_port]',
            description: 'api-server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './lib/app/docs/swagger-output.json';
const endpointsFiles = ["./lib/app/routes/index.routes.ts"];
swaggerAutogen({openapi: '3.1.0'})(outputFile, endpointsFiles, doc);
