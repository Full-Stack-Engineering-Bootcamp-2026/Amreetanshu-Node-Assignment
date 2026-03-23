const http = require('http');
const routes = require('./routes');

const server = http.createServer((req, res) => {
if (req.url === '/' && req.method === 'GET') {
routes.getForm(req, res);
}
else if (req.url === '/submit' && req.method === 'POST') {
routes.handleForm(req, res);
}
else {
res.writeHead(404);
res.end('Page Not Found');
}
});

server.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});