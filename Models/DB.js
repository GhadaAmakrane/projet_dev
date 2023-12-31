const { Sequelize } = require('sequelize');
path = require('path')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite')
});

module.exports = db