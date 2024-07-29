const authenticationMiddleware = (req, resp, next) => {
  const authHeader = req.headers['authorization'];
  const version = req.query.version;
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    next();
  } else {
    resp.sendStatus(401);
  }
};

module.exports = { authenticationMiddleware };
