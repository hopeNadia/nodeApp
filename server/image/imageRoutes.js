const express = require('express');
const routes = express.Router();
const controllers = require('./imageControllers');
const {multerUpload} = require('../helpers/db');

routes.post('/upload', multerUpload.single('imageData'), uploadImage);
routes.get('/get', getImage);

function uploadImage(request, response, next) {
  controllers
    .upload(request)
    .then(item => response.json(item))
    .catch(err => next(err));
}

function getImage(request, response, next) {
  controllers
    .get(request.body)
    .then(readStrem => readStrem.pipe(response))
    .catch(err => next(err));
}

module.exports = routes;
