const express = require('express');
const app = express();
const route = express.Router();
const {
  authenticationMiddleware,
} = require('./middleware/authenticateMiddleware');

// route.use(authenticationMiddleware);
//we can apply middleware to individual routes or we can do below thing also
app.use('/user', authenticationMiddleware, route);

route.get('/profile', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', route);

// or we can do this also

app.use('/user', authenticationMiddleware, route);

// Middleware to log requests

app.listen(3000, () => {});
