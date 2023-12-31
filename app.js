const express = require('express');
const utilisateurController = require('./Controlleurs/Utilisateur_Con');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/static')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/login', utilisateurController.renderLoginPage);
app.post('/login', utilisateurController.loginUser);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'RegisterPage.html'));
});
app.post('/register', utilisateurController.createUtilisateur);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});