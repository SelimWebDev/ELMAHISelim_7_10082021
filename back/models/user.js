const Sequelize = require('sequelize')
const sequelize = require("../database")

const User = sequelize.define("user", {
    user_id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    prenom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pseudo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mdp: {
        type: Sequelize.STRING,
        allowNull: false
    },   
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = User;