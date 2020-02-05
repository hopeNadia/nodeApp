const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());

const router = express.Router();
const routes = require('./routes/userRoutes');

const port = 5000;

const db = require('./db');
const dbConnection = new db();
dbConnection.initializeCollection('ownTest', 'user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
