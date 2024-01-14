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
    defaultValue : new Date(),
  },
});

Evenements.belongsTo(Utilisateurs, { foreignKey: 'FullName'}); 
Utilisateurs.hasMany(Evenements, { foreignKey: 'FullName'}); 


module.exports = Evenements;
