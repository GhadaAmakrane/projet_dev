const userModel = require('./Utilisateurs.js');
const db = require('./DB.js');


async function initDB() {
    await db.sync({force: true})
    
    await userModel.create({
        FullName: "GhadaAM",
        Email: "ghada.amakrane1@gmail.com",
        Password:"AZERTY",
        Gender: "female"
    })

    await userModel.create({
        FullName: "Sara",
        Email: "sara.amakrane1@gmail.com",
        Password:"ghada",
        Gender: "female"
    })

}

initDB()
    .then(() => {
        console.log("base initialisée")
    })
