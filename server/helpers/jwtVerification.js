var jwt = require('jsonwebtoken');

const config = {
  secret: 'MY_SECRET_KEY'
};

function verifyToken(request, response, next) {
  var token = request.headers.authorization;

  if (!token) throw 'No auth token provided';

  jwt.verify(token.replace('Bearer ', ''), config.secret, (err, decoded) => {
    if (err) throw 'Not valid authorize token';
  });

  next();
}

module.exports = {
  verifyToken
};
