const fs = require('fs');

//To create the file
fs.writeFileSync('hello.txt', 'shivam tripathi');

// To get the file path
const path = require('path');
const dirPath = path.join(__dirname, 'HelloWord.txt');

fs.writeFileSync(dirPath, 'shivam tripathi');

// To read directory
fs.readdir(__dirname, (err, files) => {
  files.forEach((e) => {
    // console.log(e);
  });
});

//To read file
fs.readFile(dirPath, 'utf-8', (err, file) => {
  console.log(file);
});

// To append in file
fs.appendFile(dirPath, 'append content', (err) => {
  if (err) {
    console.log(err);
  }
});

//To rename file
fs.rename(dirPath, `${__dirname}/Reanme-file.txt`, (err) => {
  if (err) {
    console.log(err);
  }
});
