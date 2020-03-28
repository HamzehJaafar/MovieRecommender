var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	if (req.method == 'POST') {
    console.log('POST')
	
	var q = url.parse(req.url, true);
	var filename = q.pathname;
	var body = ''

	if (filename == '/users'){
    req.on('data', function(data) {
      body += data
    })
    req.on('end', function() {
	  fs.writeFile('users.json', body, 'utf8', function (err) { 
                        if (err)
        console.log(err);
                        else
        console.log('Updated users.');
		});
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('post received')
	  
	  
    })
	}
	else if (filename == '/matrix'){
	console.log(body);
	 req.on('data', function(data) {
      body += data
    })
	req.on('end', function() {
	  fs.writeFile('matrix.txt', body, 'utf8', function (err) { 
                        if (err)
        console.log(err);
                        else
        console.log('Updated matrix.');
		});
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.end('post received')
	  
	  
    })
	}
  } else {
    console.log('GET')
	
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
}).listen(8080);


console.log('Listening at: localhost:8080/index.html');


