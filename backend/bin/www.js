require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('../api/api');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const notification = require('../other/notification');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const active = 1;

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', api);
app.use('/notification', notification);

server.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});
const swaggerDefinition = {
  info: {
    title: 'MercarChevere API',
    version: '1.0.0',
    description: 'API rest para aplicación MercarChevere.com',
  },
  host: `localhost:${port}`,
  basePath: '/',
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ['api/api.js'],
};

app.get('/', (req, res) => {
  res.json({ info: 'HOLA MUNDO' });
});
//const swaggerDocs = swaggerJsDoc(swaggerOptions);
//app.use(swaggerUi.serve, swaggerUi.setup(swaggerDocs));
