const db = require('../helpers/db');
const bcrypt = require('bcryptjs');

const User = db.User;

async function getAll() {
  var query = User.find();
  return query.exec();
}

async function getById(userParam) {
  const itemId = userParam.id;
  return await User.findById(itemId).select('-hash');
}

async function create(userParam) {
  const user = new User(userParam);

  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

async function deleteById(userParam) {
  await User.findByIdAndRemove(userParam.id);
}

async function updateById(userId, newUser) {
  const user = await User.findById(userId);

  if (!user) throw 'User not found';
  if (user.username !== newUser.username && (await User.findOne({username: newUser.username}))) {
    throw 'Username "' + newUser.username + '" is already taken';
  }

  Object.assign(user, newUser);

  await user.save();
}

module.exports = {
  getById,
  getAll,
  deleteById,
  create,
  updateById
};
