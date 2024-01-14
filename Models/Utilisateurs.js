const { DataTypes } = require('sequelize')
const db = require('./DB.js')

const Utilisateurs = db.define('Utilisateurs', {
    FullName: {
      type: DataTypes.STRING,
      primaryKey: true, 
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true 
      }
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['male', 'female']] 
          }
      }

  },);


module.exports = Utilisateurs
