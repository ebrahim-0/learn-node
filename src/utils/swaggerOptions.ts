// Swagger definition
export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Express API",
      version: "1.0.0",
      description: "Documentation for your API endpoints",
    },
    servers: [
      {
        url: "https://learn-node-tn09.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            price: {
              type: "number",
            },
            description: {
              type: "string",
            },
            qty: {
              type: "number",
            },
            image: {
              type: "string",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.ts"],
};
