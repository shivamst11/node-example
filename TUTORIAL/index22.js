// - Apply get method
// - Remove and extension from url
// - make 404 page
// - apply 404 page

// we don't want to ***http://localhost:8000/home.html*** extension type of url  so we not gonna use this-> app.use(express.static(publicFolderPath));

const express = require('express');
const app = express();
const path = require('path');


const publicFolderPath = path.join(__dirname, 'public');

app.get('/', (_, resp) => {
  resp.sendFile(publicFolderPath + '/index.html');
});

app.get('/about', (_, resp) => {
  resp.sendFile(publicFolderPath + '/about.html');
});

app.get('/home', (_, resp) => {
  resp.sendFile(publicFolderPath + '/home.html');
});

//wildcard route
app.get('*', (_, resp) => {
  resp.sendFile(publicFolderPath + '/notFound.html');
});

app.listen(4200, () => {
  console.log('servers running on 4200');
});
