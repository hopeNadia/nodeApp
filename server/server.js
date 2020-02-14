const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/errorHandler');

const router = express.Router();
const userRoutes = require('./user/userRoutes');
const authRoutes = require('./auth/authRoutes');

var cors = require('cors');
app.use(cors());

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);
app.use(userRoutes);
app.use(authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
