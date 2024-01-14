const Evenements = require('../Models/Evenements.js');

exports.CreateEventToday = async (req, res) => {
    const { title, FullName } = req.body; 
    
    try {
      const newEvent = await Evenements.create({
        title: title,
        dateARealiser: new Date(), 
        FullName: FullName      
      });
      res.status(201).json({ message: 'Événement ajouté avec succès' })
    } catch (error) {
      res.status(500).json({ message: `Erreur lors de l'ajout de l'événement : ${error.message}` });
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
      res.status(201).json({ message: 'Événement ajouté avec succès' })
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement :', error);
    }
}

