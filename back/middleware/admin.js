const jwt = require('jsonwebtoken');
require("dotenv").config();


console.log(process.env.ADMIN_ID)
module.exports = (req, res, next) => {
    let admin = process.env.ADMIN_ID
    const token = req.headers.authorization.split(' ')[1];                      
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');              
    const userId = decodedToken.userId;                                         
    if (userId != admin) {                                                            
        res.status(401).json({error: 'Vous devez être administrateur'})
    } else {
      next();
    }
}