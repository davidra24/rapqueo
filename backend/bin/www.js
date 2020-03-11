const http = require("http");
const express = require("express");
const api = require("../api/api");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//server.listen(port);
server.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});

app.use("/api", api);

//app.use(express.static('dist'));

app.get("/", (req, res) => {
  res.json({ info: "HOLA PUTO" });
});
