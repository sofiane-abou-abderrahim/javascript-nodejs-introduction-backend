const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

/*

When we parse incoming data for our API which we're now building,
I don't expect form data anymore but I expect JSON data,
so I will try to parse incoming JSON data here

*/

app.use(bodyParser.json());

app.use(locationRoutes);

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/html');
//   next();
// });

// app.use((req, res, next) => {
//   const userName = req.body.username || 'Unknown User';

//   res.render('index', {
//     user: userName
//   });
// });

app.listen(3000);
