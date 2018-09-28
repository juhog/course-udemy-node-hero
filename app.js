const express = require('express');
const app = express();

const eventRouter = require('./src/routes/eventRoutes');
const dbRouter = require('./src/routes/dbRoutes');

app.use(express.static('public'));
app.use(express.static('bower_components'));


// app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Events', eventRouter);
app.use('/Db', dbRouter);

app.get('/', function(req, res) {
  // res.send('Root path!');
  res.render('index', {
    list: ['first', 'second', 'third'],
    nav: [
      { Link: 'Services', Text: 'Services' },
      { Link: 'Portfolio Foo', Text: 'Portfolio Foo' },
      { Link: 'About', Text: 'About' },
      { Link: 'Team', Text: 'Team' },
      { Link: 'Contact', Text: 'Contact' },
      { Link: 'Events', Text: 'Events' },
    ]
  });
});

const port = 8080;
app.listen(port, function(err){
  console.log('Foo! Server running at http://127.0.0.1:' + port);
});

/*
const http = require("http");

http.createServer(function (request, response) {
  // Send the HTTP header
  // HTTP Status: 200 : OK
  // Content Type: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // Send the response body as "Hello World"
  response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
*/


