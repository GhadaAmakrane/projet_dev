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

    res.status(201).send('Utilisateur enregistré avec succès');
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
        res.status(200).send('Connexion réussie !');
      } else {
        res.status(401).send('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion : ', error);
      res.status(500).send('Erreur lors de la connexion.');
    }
  };