

const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: "C:\Users\ghada\Downloads\sqlite-tools-win-x64-3440200\sqlite3.exe"
});

module.exports = db