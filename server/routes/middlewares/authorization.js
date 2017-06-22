
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET;

exports.authenticate = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(400).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
