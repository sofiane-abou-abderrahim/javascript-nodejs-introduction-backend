const http = require('http');

/*

we create a server
which requires a request listener as an argument
this is a function which in the end triggers for every incoming request
This request listener function takes two arguments which are passed in automatically by Node.js:
  - a request object
  - and a response object.

*/

const server = http.createServer((request, response) => {
  // response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Type', 'text/html');
  // above we set an extra header, so we add extra metadata to the response header
  // when sending back the response that explains to the browser which kind of data is attached
  // Now, all browsers will render it as such
  response.write('<h1>Hello there!</h1>'); // configures the response
  response.end(); // sends the response
});

server.listen(3000); // required to start the server
