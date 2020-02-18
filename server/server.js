const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/errorHandler');

const router = express.Router();

const verifyToken = require('./helpers/jwtVerification').verifyToken;
const userRoutes = require('./user/userRoutes');
const authRoutes = require('./auth/authRoutes');
const imageRoutes = require('./image/imageRoutes');

var cors = require('cors');
app.use(cors());

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);
app.use(authRoutes);
// app.use('/users', verifyToken, userRoutes);
app.use('/users', userRoutes);
app.use('/image', imageRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
