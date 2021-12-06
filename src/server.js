require('dotenv').config();
const express = require('express');
const router = require('./routes');
const app = express();

app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Your app listening at http://${process.env.HOST}:${process.env.PORT}`);
});
