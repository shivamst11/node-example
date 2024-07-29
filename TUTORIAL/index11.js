const http = require('http');

const server = http.createServer((req, resp) => {
  resp.writeHead(200, { 'Content-Type': 'applicationjson' });
  resp.write(JSON.stringify({ name: 'shivam tripathi' }));
  resp.end();
});

server.listen(4600, () => {
  console.log('Server listeaning on port 4600');
});
