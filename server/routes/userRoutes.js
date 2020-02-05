const express = require('express');
const path = require('path');
const routes = express.Router();
const controllers = require('../controllers/user');

routes.post('/users/login', controllers.login);

// test api
routes.get('/user/:id', controllers.getUserById);
routes.get('/users', controllers.getUsers);
routes.get('/deleteuser/:id', controllers.deleteUser);
routes.post('/adduser', controllers.addUser);
routes.post('/updateuser/:id', controllers.updateUser);

module.exports = routes;
