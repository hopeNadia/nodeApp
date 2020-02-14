var jwt = require('jsonwebtoken');

const config = {
  secret: 'MY_SECRET_KEY'
};

function verifyToken(request, response, next) {
  var token = request.headers['x-access-token'] || request.headers.authorization.replace('Bearer ', '');

  console.log(token);

  if (!token) throw 'No auth token provided';

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(err, decoded);
    if (err) throw 'Token not right';
  });

  return next();
}

module.exports = {
  verifyToken
};
