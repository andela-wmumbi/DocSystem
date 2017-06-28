
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET;
class Authenticate {
  authenticate(req, res, next) {
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
  }
  verifyAdmin(req, res, next) {
    console.log(req);
    const role = req.decoded.roleId;
    if (role && role === 1) {
      next();
    } else {
      return res.status(403).send({
        message: 'You do not have permission'
      });
    }
  }
  verifyOwner(req, res, next) {
    const role = req.decoded.roleId;
    if (role && role === 2) {
      next();
    } else {
      return res.status(403).send({
        message: 'You do not have permission'
      });
    }
  }
}
module.exports = new Authenticate();
