import express from 'express';

const app = express();
app.use(express.json());

let users = []; // Nur für Demo, in echt DB nutzen!
let sessions = {};

function generateToken() {
  return Math.random().toString(36).substring(2);
}

// Registrierung
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Benutzer existiert bereits' });
  }
  users.push({ username, password });
  res.json({ success: true });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
  }
  const token = generateToken();
  sessions[token] = username;
  res.json({ token });
});

// Logout (Client löscht Token)
app.post('/api/logout', (req, res) => {
  const { token } = req.body;
  delete sessions[token];
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API läuft auf http://localhost:${PORT}`);
});