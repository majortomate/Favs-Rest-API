const express = require('express');
require('dotenv').config();

const configExpress = require('./config/express');
const routesConfig = require('./routes');
const connectDatabase = require('./config/database');
const swagger = require('./config/swagger');

const app = express();

const { PORT } = process.env;
const NODE_ENV = process.env.NODE_ENV || 'develop';

app.listen(PORT, async () => {
  // Configure express
  configExpress(app);

  // Connect to database
  await connectDatabase();

  // Swagger
  swagger(app, PORT);
  // Configure routes
  routesConfig(app);

  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
