// const http = require('http');

// http
//   .createServer((req, resp) => {
//     resp.write('<h1>Hey this is my first code</h1>');
//     resp.end();
//   })
//   .listen(4500);

/**--------------------------------------------------**/

const http = require('http');
const url = require('url');
const fs = require('fs');

http
  .createServer((req, resp) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    // Serve different pages based on the URL
    if (pathName === '/' || pathName === '/home') {
      // Read the HTML file for the home page
      fs.readFile('./pages/home.html', (err, data) => {
        if (err) {
          resp.writeHead(404, { 'Content-Type': 'text/html' });
          resp.write(`<!-- home.html -->
          <!DOCTYPE html>
          <html>
          <head>
              <title>Home Page</title>
          </head>
          <body>
              <h1>Welcome to the Home Page</h1>
              <p>This is the home page content.</p>
              <a href="/about">Go to About Page</a>
          </body>
          </html>`);
          resp.end();
        } else {
          resp.writeHead(200, { 'Content-Type': 'text/html' });
          resp.write(data);
          resp.end();
        }
      });
    } else if (pathName === '/about') {
      // Read the HTML file for the about page
      fs.readFile('./pages/about.html', (err, data) => {
        if (err) {
          resp.writeHead(404, { 'Content-Type': 'text/html' });
          resp.write(`!DOCTYPE html>
          <html>
          <head>
              <title>About Page</title>
          </head>
          <body>
              <h1>About Us</h1>
              <p>This is the about page content.</p>
              <a href="/">Go to Home Page</a>
          </body>
          </html>`);
          resp.end();
        } else {
          resp.writeHead(200, { 'Content-Type': 'text/html' });
          resp.write(data);
          resp.end();
        }
      });
    } else {
      // Handle 404 - Page Not Found
      resp.writeHead(404, { 'Content-Type': 'text/html' });
      resp.write('<h1>404 Not Found</h1>');
      resp.end();
    }
  })
  .listen(4500, () => {
    console.log('Server is running on port 4500');
  });
