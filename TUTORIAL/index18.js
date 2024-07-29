const express = require('express');
const fs = require('fs');

const app = express();

app.get('', (req, res) => {
  res.send('sdfsdf');
});

app.get('/about', (req, res) => {
  res.send('about page');
});

app.get('/profile', (req, res) => {
  fs.readFile(__dirname + '/001HomePage.html', 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(html);
  });
});

app.listen(4700, () => {
  console.log('port listeaning on 4700');
});
