const express = require('express');
const routes = express.Router();
const controllers = require('./userControllers');

routes.get('/users', verifyToken, getUsers);
routes.get('/user/:id', getUserById);
routes.get('/deleteuser/:id', _delete);
routes.post('/updateuser/:id', update);
routes.post('/adduser', create);

module.exports = routes;

function getUsers(request, response, next) {
  controllers
    .getAll()
    .then(users => response.json(users))
    .catch(err => next(err));
}

function getUserById(request, response, next) {
  controllers
    .getById(request)
    .then(user => (user ? response.json(user) : response.sendStatus(404)))
    .catch(err => next(err));
}

function create(request, response, next) {
  controllers
    .create(request.body)
    .then(() => response.json({}))
    .catch(err => next(err));
}

function _delete(request, response, next) {
  controllers
    .deleteById(request.params)
    .then(() => response.json({}))
    .catch(err => next(err));
}

function update(request, response, next) {
  controllers
    .update(request.params, request.body)
    .then(() => response.json({}))
    .catch(err => next(err));
}
