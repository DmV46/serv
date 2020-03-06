const router = require('express').Router();

const routerUser = require('./users');
const routerCards = require('./cards');

router.use('/', routerUser);
router.use('/', routerCards);
router.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
