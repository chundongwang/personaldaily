var http = require('http');
var os = require('os');
var path = require('path');
var fs = require('fs');

var port_table = [['Jewelry-MSFT', 8081],['Yanpings-MacBook-Air.local', 8082]];

// Look up the port_table to find the appropriate port to use
//
console.log('Setting up the server for '+os.hostname()+'...');
var port = 8080;
for (var i=0; i<port_table.length; i++) {
  console.info('looping computer in port table: '+port_table[i][0]);
  if (port_table[i][0]==os.hostname()) {
    port = port_table[i][1];
    break;
  }
}

if (port == 8080) {
  console.warn('Cannot find this computer in port table. You might have problem with NAT!!');
}

http.createServer(function (req, res) {
  var filepath = '.'+req.url;
  if (filepath=='./')
    filepath='./static/index.html';
  console.log('serving '+filepath);

  if (filepath.indexOf('./static/') == 0) {
    // Serving static files
    path.exists(filepath, function (exists) {
      if (exists) {
        fs.readFile(filepath, function (error, content) {
          if (error) {
            res.writeHead(500);
            res.end();
          } else {
            var ext = path.extname(filepath);
            var contentType = 'text/html';
            switch (ext) {
              case '.js':
                contentType = 'text/javascript';
                break;
              case '.css':
                contentType = 'text/css';
                break;
              case '.png':
                contentType = 'image/png';
                break;
              case '.gif':
                contentType = 'image/gif';
                break;
              case '.jpg':
                contentType = 'image/jpg';
                break;
              case '.ico':
                contentType = 'image/vnd.microsoft.icon';
                break;
            }

            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } else if (filepath.indexOf('./hello') == 0) {
    // Serving test object
    require('./test.js').HelloWorld(req, res);
  }

}).listen(port);

console.log('Server running at http://127.0.0.1:%d/', port);
console.log('Go to http://192.168.1.1/ to add port penetration config with your IP address and port for HTTP.');
console.log('Then you might use http://personaldaily.publicvm.com:<yourport>/ to access your local server.');
