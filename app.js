const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// with Express.js we can use a middleware that does this body parsing for us
// and the very popular package for parsing the request body and adding the parsed body to the request object is the body-parser package
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown User';

  res.send(
    `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
  ); // new method added by Express.js
});

app.listen(3000);
