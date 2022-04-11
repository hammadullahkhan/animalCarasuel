const jwt = require('jsonwebtoken');

class AuthService {
  static getToken() {
    return jwt.sign(
      { user: 'somevaliduser' },
      process.env.SIGNING_KEY,
      { expiresIn: '2 days' },
    );
  }

  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SIGNING_KEY , (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }
}

module.exports = AuthService;
