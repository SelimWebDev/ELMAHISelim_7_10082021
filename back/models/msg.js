const Sequelize = require('sequelize')
const sequelize = require("../database")

const Msg = sequelize.define("msg", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    contain: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    authorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    like: {
        type: Sequelize.INTEGER,
        allowNull: false
    },   
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Msg;