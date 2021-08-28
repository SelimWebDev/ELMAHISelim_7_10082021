const Msg = require('../models/msg')
const fs = require('fs');

exports.createMsg = (req, res, next) => {                           // créer un msg
    var contain, date, authorId, authorName, imageUrl
    if (!req.file) {                                            // req sans image
        contain = req.body.contain
        date = req.body.date
        authorId = req.body.authorId
        authorName = req.body.authorName
        imageUrl = null
    } else {                                
        contain = req.body.contain                      // req avaec image
        date = req.body.date
        authorId = req.body.authorId
        authorName = req.body.authorName
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    
    Msg.create({contain: contain, date: date, authorId: authorId, authorName: authorName, like: 0, imageUrl: imageUrl})
    .then( () => res.status(201).json({message: 'Message créée avec succès!'}))
    .catch( (error) => res.status(400).json({error}))
}

exports.getOne = (req, res, next) => {
    const msgId = req.params.id
    Msg.findOne({ where: { id: msgId } })
    .then((msg) => res.status(200).json(msg))
    .catch((error) => res.status(400).json({error: error}))
}

exports.getAll = (req, res, next) => {
    Msg.findAll()
    .then((msg) => res.status(200).json(msg))
    .catch((error) => res.status(400).json({error: error}))
};

exports.deleteMsg = (req, res, next) => {
    const msgId = req.body.msgId

    Msg.findOne({ where: { id: msgId } })                                   
    .then((thing) => {
        if (thing.imageUrl != null){                                                                // si le msg a une image
            const filename = thing.imageUrl.split('/images/')[1];   
            fs.unlink(`images/${filename}`, () => {
                console.log("unlink")
                Msg.destroy({ where: { id: msgId } })
                .then(() => res.status(200).json({ message: 'objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        } else {
            Msg.destroy({ where: { id: msgId } })                                                   // si il n'a pas d'image
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
}