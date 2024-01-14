const Evenements = require('../Models/Evenements.js');

exports.CreateEventToday = async (req, res) => {
    const { eventName, utilisateur } = req.body; 
    
    try {
      const newEvent = await Evenements.create({
        title: eventName,
        dateARealiser: new Date(), 
        FullName: utilisateur      
      });
      console.log('Événement créé :', newEvent.toJSON());
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
}

exports.CreateEventdate = async (req, res) => {
    const { eventName, utilisateur ,date } = req.body; 
    
    try {
      const newEvent = await Evenements.create({
        title: eventName,
        dateARealiser: date, 
        FullName: utilisateur      
      });
      console.log('Événement créé :', newEvent.toJSON());
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
}

