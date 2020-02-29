const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/settings');


module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie || cookie.startsWith('jwt= ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = req.cookies.jwt;
  let playload;

  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = playload;

  return next();
};
