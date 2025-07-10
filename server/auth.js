import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();
import { Router } from 'express';
export default Router();

const app = express();

app.use(session({ secret: 'dein_geheimes_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Hier kannst du den User in der DB speichern oder suchen
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Login-Route
app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback-Route
app.get('/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// API für Userdaten
app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ username: req.user.username, githubId: req.user.id });
  } else {
    res.status(401).json({ error: 'Nicht eingeloggt' });
  }
});

app.listen(3001, () => console.log('Server läuft auf Port 3001'));






// import express from 'express';

// const app = express();
// app.use(express.json());

// let users = []; // Nur für Demo, in echt DB nutzen!
// let sessions = {};

// function generateToken() {
//   return Math.random().toString(36).substring(2);
// }

// // Registrierung
// app.post('/api/register', (req, res) => {
//   const { username, password } = req.body;
//   if (users.find(u => u.username === username)) {
//     return res.status(400).json({ error: 'Benutzer existiert bereits' });
//   }
//   users.push({ username, password });
//   res.json({ success: true });
// });

// // Login
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (!user) {
//     return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
//   }
//   const token = generateToken();
//   sessions[token] = username;
//   res.json({ token });
// });

// // Logout (Client löscht Token)
// app.post('/api/logout', (req, res) => {
//   const { token } = req.body;
//   delete sessions[token];
//   res.json({ success: true });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API läuft auf http://localhost:${PORT}`);
});