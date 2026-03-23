const fs = require('fs');


function getForm(req, res) {
fs.readFile('messages.json', (err, data) => {
let messages = [];

if (!err && data.length > 0) {
messages = JSON.parse(data);
}

res.writeHead(200, { 'Content-Type': 'text/html' });

res.write(`
<html>
<body>
<h1>Simple Form</h1>
<form action="/submit" method="POST">
<input type="text" name="name" placeholder="Enter Name" required />
<br><br>
<textarea name="message" placeholder="Enter Message" required></textarea>
<br><br>
<button type="submit">Submit</button>
</form>

<h2>Messages:</h2>
<ul>
`);

messages.forEach(msg => {
res.write(`<li><strong>${msg.name}:</strong> ${msg.message}</li>`);
});

res.write(`
</ul>
</body>
</html>
`);

res.end();
});
}

function handleForm(req, res) {
let body = '';

req.on('data', chunk => {
body += chunk.toString();
});

req.on('end', () => {
const params = new URLSearchParams(body);

const name = params.get('name');
const message = params.get('message');

console.log('Name:', name);
console.log('Message:', message);

fs.readFile('messages.json', (err, data) => {
let messages = [];

if (!err && data.length > 0) {
messages = JSON.parse(data);
}

messages.push({ name, message });

fs.writeFile('messages.json', JSON.stringify(messages), () => {
res.writeHead(302, { Location: '/' });
res.end();
});
});
});
}

module.exports = {
getForm,
handleForm
};
