/* 
MiddleWare
What are middlewares (authentication , nignix)
We apply middleware in routes to modify the request and response.
*/

const express = require('express');
const app = express();

const authenticationMiddleware = (req, resp, next) => {
  // http://localhost:3000/?version="2.0.1"

  const authHeader = req.headers['authorization'];
  const version = req.query.version;
  console.log(version);
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    next();
  } else {
    resp.sendStatus(401);
  }
};

app.use(authenticationMiddleware);
app.get('/', (req, resp) => {
  resp.json({ name: 'shivam' });
});

app.listen(3000, () => {});
