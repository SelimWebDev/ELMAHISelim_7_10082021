const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/user")
const Msg = require("../models/msg")

exports.deleteOne = (req, res, next) => {
  const userId = req.body.userId
  Msg.destroy({ where: { authorId: userId } })
  User.destroy({ where: { user_id: userId } })
  .then(() => res.status(200).json({message: 'utilisateur supprimé'}))
  .catch((err) => console.log(err))
}

exports.getOne = (req, res, next) => {
  const userId = req.params.id
  User.findOne({ where: { user_id: userId } })
  .then((user) => res.status(200).json(user))
  .catch((err) => console.log(err))
}

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.mdp, 10, (error, hash) => {
    if (error) throw error
    const nomSaisie = req.body.nom
    const prenomSaisie = req.body.prenom
    const pseudoSaisie = req.body.pseudo
    const mdpSaisie = hash
    User.create({nom: nomSaisie,prenom: prenomSaisie,pseudo: pseudoSaisie, mdp: mdpSaisie})
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(() => res.status(400).json({ message:'Ce pseudo est déjà utilisé' }));
  })
}

exports.login = (req, res, next) => {
  const pseudoSaisie = req.body.pseudo
  const mdpSaisie = req.body.mdp

  User.findOne({ where: { pseudo: pseudoSaisie } })
  .then((user) => { 
    bcrypt.compare(mdpSaisie, user.mdp)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ message: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userPseudo: user.pseudo,
        userId: user.user_id,
        token: jwt.sign(
          { userId: user.user_id,
            userPseudo: user.pseudo },
          'RANDOM_TOKEN_SECRET',
          { expiresIn: '24h' }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
   })
  .catch(() => res.status(400).json({ message: "Le pseudo saisie est incorrect" }))
};