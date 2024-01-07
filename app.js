const express = require('express');
const session = require('express-session');
const utilisateurController = require('./Controlleurs/Utilisateur_Con');
const path = require('path');

const app = express();
const port = 3000;

app.use(session({
  secret:"ghada2001!!!!%%%",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '/static')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/login', utilisateurController.renderLoginPage);
app.post('/login', utilisateurController.loginUser);

app.get('/getUsername' , (req, res) => {
  const username = req.session.username;
  res.json({username: username})
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'RegisterPage.html'));
});
app.post('/register', utilisateurController.createUtilisateur);

app.get('/events/:FullName', utilisateurController.getUserEvents, (req, res) => {
  const userEvents = req.userEvents;
  res.sendFile(path.join(__dirname, 'static', 'page_1.html'));
});

app.post('/events/:FullName', utilisateurController.createEvents);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});