const Comment = require('../models/comment')

exports.createComment = (req, res, next) => {                           // créer un commentaire
    var contain, date, authorId, authorName, imageUrl
    contain = req.body.contain
    date = req.body.date
    msgId = req.body.msgId
    authorId = req.body.authorId
    authorName = req.body.authorName
    
    Comment.create({contain: contain, date: date, msgId: msgId, authorId: authorId, authorName: authorName})
    .then( () => res.status(201).json({message: 'Commentaire créée avec succès!'}))
    .catch( (error) => res.status(400).json({error}))
}

exports.getAll = (req, res, next) => {
    const msgId = req.params.id
    Comment.findAll({ where: { msgId: msgId }})
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(400).json({error: error}))
};

exports.deleteComment = (req, res, next) => {
    const commentId = req.body.commentId
    Comment.destroy({ where: { id: commentId } })                                                   
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}