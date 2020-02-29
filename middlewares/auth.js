const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || cookie.startsWith('jwt= ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = cookie.replace('jwt=', '');

  let playload;
  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = playload;
  return next();
};
