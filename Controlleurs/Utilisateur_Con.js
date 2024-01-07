const Evenements = require('../Models/Evenements.js');
const Utilisateurs = require('../Models/Utilisateurs.js');

exports.createUtilisateur = async (req, res) => {
  try {
    const { FullName, Email, Password,Gender } = req.body;

    const nouvelUtilisateur = await Utilisateurs.create({
      FullName,
      Email,
      Password,
      Gender
    });

    const filePath = path.join(__dirname, '../static/index.html');
    res.sendFile(filePath);
    console.log("enregistrement fait avec succés");
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur');
  }
};

exports.renderLoginPage = (req, res) => {
    res.render('Index');
  };
  
  exports.loginUser = async (req, res) => {
    const { FullName, Password } = req.body;
  
    try {
      const utilisateur = await Utilisateurs.findOne({ where: { FullName: FullName, Password: Password } });
  
      if (utilisateur) {
        req.session.username = FullName;
        const filePath = path.join(__dirname, '../static/Page_1.html');
        res.sendFile(filePath);
        console.log('Connexion réussie !');
      } else {
        const filePath = path.join(__dirname, '../static/index.html');
        res.sendFile(filePath);
      }
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
      res.status(500).send('Erreur lors de la connexion.');
    }
  };


exports.getUserEvents = async (req, res, next) => {
  try {
    const { FullName} = req.body; 
    const userEvents = await Evenement.findAll({ where: { FullName } }); 
    req.userEvents = userEvents;
    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des événements de l\'utilisateur', error: error.message });
  }
};

exports.createEvents = async (req, res, next) => {
  try {
    const fullName = req.params.FullName; 
    const eventData = req.body; 

    const nouvelEvenement = await Evenements.create({
      title: eventData,
      dateARealiser:Date.now(),
      creator: fullName

    });
    req.nouvelEvenement = nouvelEvenement;

    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement', error: error.message });
  }
};