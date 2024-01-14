const Evenements = require('../Models/Evenements.js');
const Utilisateurs = require('../Models/Utilisateurs.js');

// Today - Page 1
exports.CreateEventToday = async (req, res) => {
    const { title, FullName } = req.body; 
    
    try {
      await Evenements.create({
        title: title,
        dateARealiser: new Date(), 
        FullName: FullName      
      });
      res.status(201).json({ message: 'Événement ajouté avec succès' })
    } catch (error) {
      res.status(500).json({ message: `Erreur lors de l'ajout de l'événement : ${error.message}` });
    }
}


exports.getEventUser = async (req,res) => {
  const { FullName }  = req.params; 

  try {
    const user = await Utilisateurs.findByPk(FullName, {
      include: Evenements,
    });

    if (!user) {
      res.status(401).json({message:"User not found"});
    }

    const events = user.Evenements;
    res.status(200).json({data:events});

  } catch (error) {
    res.status(500).json({message:"Erreur serveur interne"});
  }
}

exports.deleteEventUser = async (req, res) => {
  const { eventId } = req.body ; 
  try {
      
      const event = await Evenements.findByPk(eventId);
      if (!event) {
          throw new Error("Événement non trouvé pour cet utilisateur");
      }

      // Supprimez l'événement spécifié
      await event.destroy()

      res.json({message : "Événement supprimé avec succès." });
  } catch (error) {
      res.json({ message: `Erreur lors de la suppression de l'événement : ${error.message}`})
  }
};

// One day - Calendar 

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

exports.getEventUserDay = async (req,res) => {
  const { FullName}  = req.params; 
  const { Date } = req.body 

  try {
    const user = await Utilisateurs.findByPk(FullName, {
      include: Evenements,
    });

    if (!user) {
      res.status(401).json({message:"User not found"});
    }

    const eventsOnDate = user.Evenements.filter((event) => {
      // Vous devrez ajuster cette condition en fonction de la structure de votre modèle d'événement
      return event.Date === Date;
    });

    res.status(200).json({data:eventsOnDate});

  } catch (error) {
    res.status(500).json({message:"Erreur serveur interne"});
  }
}