const Msg = require('../models/msg')

exports.createMsg = (req, res, next) => {                           // créer un msg
    const contain = req.body.contain
    const date = req.body.date
    const authorId = req.body.authorId
    const authorName = req.body.authorName
    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    Msg.create({contain: contain, date: date, authorId: authorId, authorName: authorName, like: 0})
    .then( () => res.status(201).json({message: 'Message créée avec succès!'}))
    .catch( (error) => res.status(400).json({error}))
}

exports.getAll = (req, res, next) => {
    Msg.findAll()
    .then((msg) => res.status(200).json(msg))
    .catch((error) => res.status(400).json({error: error}))
};