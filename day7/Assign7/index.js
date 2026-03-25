
const express = require('express');
const routes =require('./app');


const app =express();

app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Welcome to the app!");
  next();
});

app.use(routes);



app.listen(3000);



