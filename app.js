const http = require('http');

const server = http.createServer((request, response) => {
  let body = []; // it has to be an array
  // console.log(request.method, request.url);
  request.on('data', chunk => {
    body.push(chunk);
  }); // to get body data and parse that, add a listener on request with the "on" method instead of "addEventListener"
  request.on('end', () => {
    body = Buffer.concat(body).toString(); // convert this body from an array of data chunks into some string data we can work with
    // console.log(body);
    let userName = 'Unknown User';
    if (body) {
      userName = body.split('=')[1];
    }

    // We put this block of code inside so that I send back the response once I'm done parsing the data
    response.setHeader('Content-Type', 'text/html');
    response.write(
      `<h1>Hi ${userName}</h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
    ); // with that we will get a request, now we just have to parse it with that request object from the createServer function
    response.end();
  }); // This will be fired when we're done reading in the request, so when it has been fully parsed
});

server.listen(3000);
