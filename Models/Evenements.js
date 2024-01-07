// event.js
const { DataTypes } = require('sequelize');
const db = require('./DB.js')
const Utilisateurs = require('./Utilisateurs.js');

const Evenements = db.define('Evenements', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dateARealiser: {
    type: DataTypes.DATE, 
    allowNull: false, 
  },
});

Evenements.belongsTo(Utilisateurs, { foreignKey: 'FullName'}); 

module.exports = Evenements;
