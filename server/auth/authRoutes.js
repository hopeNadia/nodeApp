const express = require('express');
const routes = express.Router();
const controllers = require('./authController');

routes.post('/signup', signup);
routes.post('/login', login);

module.exports = routes;

function signup(request, response, next) {
  controllers
    .signup(request.body)
    .then(user => (user ? response.json(user) : response.sendStatus(404)))
    .catch(err => next(err));
}

function login(request, response, next) {
  controllers
    .login(request.body)
    .then(user => (user ? response.json(user) : response.sendStatus(404)))
    .catch(err => next(err));
}
