const db = require('../db');
const bcrypt = require('bcryptjs');
const User = db.User;

function validateEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

function validatePassword(password) {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return reg.test(password);
}

async function signup(userParam) {
  const {email, password, userName} = userParam;

  if (!validateEmail(email)) {
    throw 'Not valid email';
  }

  if (!validatePassword(password)) {
    throw 'Password must contain more than 8 characters: at least 1 uppercase letter, 1 lowercase letter, and 1 number';
  }

  if (await User.findOne({email: email})) {
    throw 'Email ' + email + 'is already in use';
  }

  if (await User.findOne({userName: userName})) {
    throw 'UserName ' + userName + 'is already in use';
  }

  const user = new User(userParam);

  if (password) {
    user.hash = bcrypt.hashSync(password, 10);
  }

  await user.save();

  return user;
}

async function login(userParam) {
  const {email, password, userName} = userParam;

  if ((email && !validateEmail(email)) || !validatePassword(password)) {
    throw 'Not valid email or password';
  }

  const user = (await User.findOne({email})) || (await User.findOne({userName}));
  const rightPassword = user && (await bcrypt.compare(password, user && user.hash));

  if (!user || !rightPassword) {
    throw 'Not right user creadentials';
  }

  return user;
}

module.exports = {
  signup,
  login
};
