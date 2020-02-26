const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // c этим и так body не пустой, у нас же формат application/json, а не application/x-www-form-urlencoded
app.use(router);

app.use(errors());
// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
