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
  response.write('Hello there!'); // configures the response
  response.end(); // sends the response
});

server.listen(3000); // required to start the server
