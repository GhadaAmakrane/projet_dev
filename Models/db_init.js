const userModel = require('./Utilisateurs.js');
const db = require('./DB.js');
const eventModel = require('./Evenements.js')


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

    const sara = await userModel.findOne({ where: { FullName: "Sara" }});

    await eventModel.create({
        title:"apprendre",
        description: "ggggggggggggggg",
        dateARealiser : new Date('2024-12-31'),
        creator: "Sara"
    })

}

initDB()
    .then(() => {
        console.log("base initialisée")
    })
