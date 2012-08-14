var http = require('http');
var os = require('os');
var port_table = [['JEWELRY-MSFT', 8081],['Yanpings-MacBook-Air.local', 8082]];

console.log('Setting up the server for '+os.hostname()+'...');
var port = 8080;
for (var i=0; i<port_table.length; i++) {
  console.info('looping computer in port table: '+port_table[i][0]);
  if (port_table[i][0]==os.hostname()) {
    port = port_table[i][1];
    break;
  }
}

if (port == 80) {
  console.warn('Cannot find this computer in port table. You might have problem with NAT!!');
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, '127.0.0.1');

console.log('Server running at http://127.0.0.1:%d/', port);
console.log('Go to http://192.168.1.1/ to add port penetration config with your IP address and port for HTTP.');
console.log('Then you might use http://personaldaily.http01.com:<yourport>/ to access your local server.');
