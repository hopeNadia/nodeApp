const db = require('../db');
const dbConnection = new db();

function login(request, response) {
  const {email, password} = request.body;

  console.log('email, password', email, password);

  dbConnection.collection.find({email, password}, {projection: {_id: 0}}).toArray((error, data) => {
    if (error) return response.status(500).send(`Error ${error}`);

    console.log('data', data);

    const responseData = {
      data,
      loginSuccess: data.length > 0
    };
    response.send(responseData);
  });
}

function getUserById(request, response) {
  const itemId = request.params.id;

  dbConnection.collection.find({id: itemId}, {projection: {_id: 0}}).toArray((error, result) => {
    if (error) return response.status(500).send(`Error ${error}`);

    response.json(result);
  });
}

function getUsers(request, response) {
  dbConnection.collection.find({}, {projection: {_id: 0}}).toArray((error, result) => {
    if (error) return response.status(500).send(`Error ${error}`);

    response.send(result);
  });
}

function deleteUser(request, response) {
  const itemId = request.params.id;

  dbConnection.collection.deleteOne({id: itemId}, (error, result) => {
    if (error || !result) {
      return response.status(500).send(`Error ${error}`);
    }

    response.send({success: true, data: [result]});
  });
}

function addUser(request, response) {
  const item = request.body;

  dbConnection.collection.insertOne(item, (error, result) => {
    if (error) {
      return response.status(500).send(`Error ${error}`);
    }
    response.send({success: true, data: [item]});
  });
}

function updateUser(request, response) {
  const itemId = request.params.id;
  const newItem = request.body;

  dbConnection.collection.updateOne({id: itemId}, {$set: newItem}, (error, result) => {
    if (error || !result) {
      return response.status(500).send(`Error ${error}`);
    }

    response.send({success: true, data: [newItem]});
  });
}

module.exports = {
  getUserById,
  getUsers,
  deleteUser,
  addUser,
  updateUser,
  login
};
