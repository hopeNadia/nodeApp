const express = require('express');
const routes = express.Router();
const {add} = require('./imageControllers');

routes.get('/add', addImage);

function addImage(request, response, next) {
  add(request.body)
    .then(item => response.json(item))
    .catch(err => next(err));
}

module.exports = routes;
