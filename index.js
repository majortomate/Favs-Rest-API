require('dotenv').config();

const configExpress = require('./config/express');
const connectDatabase = require('./config/database');
const swagger = require('./config/swagger');

const { PORT } = process.env;
const NODE_ENV = process.env.NODE_ENV || 'develop';

const app = configExpress();

app.listen(PORT, async () => {
  // Connect to database
  await connectDatabase();

  // Swagger
  swagger(app, PORT);

  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
