import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'dein_geheimes_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/github/callback'
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
    res.redirect('http://localhost:5173/dashboard'); // Weiterleitung nach erfolgreichem Login
  }
);

// API für Userdaten
app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      username: req.user.username,
      githubId: req.user.id,
      avatar_url: req.user.photos?.[0]?.value || ''
    });
  } else {
    res.status(401).json({ error: 'Nicht eingeloggt' });
  }
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));