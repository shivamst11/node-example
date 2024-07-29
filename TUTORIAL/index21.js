const express = require('express');
const app = express();
const path = require('path');

const publicFolderPath = path.join(__dirname, 'public');

app.use(express.static(publicFolderPath));

app.listen(4200, () => {
  console.log('servers running on 4200');
});
