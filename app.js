const express = require('express');
const session = require('express-session');
const utilisateurController = require('./Controlleurs/Utilisateur_Con');
const eventController = require('./Controlleurs/Evenements');
const path = require('path');
const Evenements = require('./Models/Evenements');

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

app.post('/event',eventController.CreateEventToday);
app.get('/event/:FullName', eventController.getEventUser);
app.delete('/event/:FullName', eventController.deleteEventUser);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'RegisterPage.html'));
});
app.post('/register', utilisateurController.createUtilisateur);

// app.post('/eventOnDay',eventController.createEvents)
app.get('eventOnDay',eventController.getEventUserDay)

app.post('/events/:FullName', utilisateurController.createEvents);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});