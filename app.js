const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*

We need to tell Express.js, which supports such templating engines, as they are called,
that we want to use this EJS templating engine,
and where it finds our views

*/
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown User';

  res.render('index', {
    user: userName
  }); // tells EJS to parse this views/index.ejs file by using the render() method added by ExpressJS
});

app.listen(3000);
