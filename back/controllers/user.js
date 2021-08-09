const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "Groupomania"
})

db.connect(function(err){
  if (err) throw err;
  console.log("Connecté à la bdd Mysql")
})

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.mdp, 10, (error, hash) => {
    if (error) throw error
    const nom = req.body.nom
    const prenom = req.body.prenom
    const pseudo = req.body.pseudo
    const mdp = hash
    db.query('INSERT INTO user VALUES (NULL, "'+nom+'", "'+prenom+'", "'+pseudo+'", "'+mdp+'")', (error, resul) => {
      if (error) throw error
      res.status(201).json({ message: 'Utilisateur créé !' })
    })
  })
}


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };