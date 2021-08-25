const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const admin = 10
    const token = req.headers.authorization.split(' ')[1];                      
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');              
    const userId = decodedToken.userId;                                         
    if (userId != admin) {                                                            
        res.status(401).json({error: 'Vous devez être administrateur'})
    } else {
      next();
    }
}