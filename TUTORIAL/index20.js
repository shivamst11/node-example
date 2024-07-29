const express = require('express');

const app = express();

app.get('/', (req, resp) => {
  resp.send('Landing Page');
});

app.get('/about', (req, resp) => {
  console.log(req.query.name); //localhost:4500/about?name=anil
  resp.send(`
<h1>This is about page</h1>
<input type="text" placeholder="User Name" value=${req.query.name} />
<a href="/details">Go to Details</a>
`);
});

app.get('/details', (req, resp) => {
  resp.send(`
    <h1>This is details page</h1>
    <a href="/about?name=shivam">Go to about</a>
    `);
});

app.listen('4500', () => {
  console.log('server is running on 4500');
});
