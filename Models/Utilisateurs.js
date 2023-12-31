const { DataTypes } = require('sequelize')
const db = require('./DB.js')

const   Utilisateurs = db.define('Utilisateurs', {
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isEmail: true 
      }
    },

    Password: {
        type: DataTypes.INTEGER,
        allowNull: false
      },


    Gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [['male', 'female']] 
          }
      }

  },);

async function initDB() {
    await sequelize.sync()
    var data = await Utilisateurs.create({
        FullName: "Ghada ",
        Email: "ghada.amakrane1@gmail.com",
        Password:"1234",
        Gender:"female"
    })
    console.log("utilisateur crée : ")
    console.log(data.toJSON())
    
}

module.exports = Utilisateurs
