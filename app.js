const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { PORT, DATABASE_URL } = require('./configuration/settings');
const { errorHandler } = require('./middlewares/errorHandler');
const router = require('./routes/index');

const app = express();

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.use(errors());
// Централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);