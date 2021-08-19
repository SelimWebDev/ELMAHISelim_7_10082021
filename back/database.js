const Sequelize = require('sequelize');

const sequelize = new Sequelize('Groupomania', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;