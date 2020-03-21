const http = require('http');
const express = require('express');
const api = require('../api/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', api);

server.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});
const swaggerDefinition = {
  info: {
    title: 'MercarChevere API',
    version: '1.0.0',
    description: 'API rest para aplicación MercarChevere.com'
  },
  host: `localhost:${port}`,
  basePath: '/'
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ['api/api.js']
};

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api', api);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(swaggerUi.serve, swaggerUi.setup(swaggerDocs));
