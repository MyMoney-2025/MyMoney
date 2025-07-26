import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dein_geheimes_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/finanzapp')
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => {
    console.error('MongoDB Verbindungsfehler:', err);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  theme: { type: String, default: 'light' },
  monthlyBudget: { type: Number, default: 0 },
  expenses: [{
    category: String,
    amount: Number,
    date: Date
  }]
});

const User = mongoose.model('User', userSchema);

// Validierung für Registrierung
const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim()
];

// Registrierung
app.post('/api/register', validateRegister, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      name
    });

    await user.save();
    res.status(201).json({ message: 'Registrierung erfolgreich' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email bereits registriert' });
    } else {
      res.status(500).json({ error: 'Server Fehler' });
    }
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, theme: user.theme } });
  } catch (error) {
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// Middleware für geschützte Routen verbessern
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Kein Auth-Header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Kein Token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verify Error:', err);
        return res.status(401).json({ error: 'Token ungültig' });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ error: 'Auth Error' });
  }
};

// Profil bearbeiten
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { name, theme } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, theme },
      { new: true }
    );
    res.json({ user: { id: user._id, name: user.name, email: user.email, theme: user.theme } });
  } catch (error) {
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// Passwort ändern
app.put('/api/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Altes Passwort falsch' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: 'Passwort erfolgreich geändert' });
  } catch (error) {
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// Budget und Ausgaben
app.post('/api/budget', authenticateToken, async (req, res) => {
  try {
    const { monthlyBudget } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { monthlyBudget },
      { new: true }
    );
    res.json({ monthlyBudget: user.monthlyBudget });
  } catch (error) {
    res.status(500).json({ error: 'Server Fehler' });
  }
});

app.post('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const { category, amount } = req.body;
    const user = await User.findById(req.user.userId);
    
    user.expenses.push({
      category,
      amount,
      date: new Date()
    });
    
    await user.save();
    res.json({ expenses: user.expenses });
  } catch (error) {
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// // GitHub OAuth Strategy
// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/api/auth/github/callback'
// }, (accessToken, refreshToken, profile, done) => {
//   // Hier kannst du den User in der DB speichern oder suchen
//   return done(null, profile);
// }));

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// // Login-Route
// app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// // Callback-Route
// app.get('/api/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('http://localhost:5173/dashboard'); // Weiterleitung nach erfolgreichem Login
//   }
// );

// ME Route verbessern
app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    console.log('User ID from token:', req.user.userId); // Debug log
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      monthlyBudget: user.monthlyBudget
    });
  } catch (error) {
    console.error('ME Route Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// GET Budget Route hinzufügen
app.get('/api/budget', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }
    res.json({
      monthlyBudget: user.monthlyBudget,
      expenses: user.expenses || []
    });
  } catch (error) {
    console.error('Budget Route Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

//PUT Route für Ausgaben hinzufügen
app.put('/api/expenses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const expenseIndex = user.expenses.findIndex(exp => exp._id.toString() === id);
    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Ausgabe nicht gefunden' });
    }

    user.expenses[expenseIndex].category = category;
    user.expenses[expenseIndex].amount = amount;
    await user.save();

    res.json({ expenses: user.expenses });
  } catch (error) {
    console.error('Update Expense Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// DELETE Route für Ausgaben hinzufügen
app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    user.expenses = user.expenses.filter(exp => exp._id.toString() !== id);
    await user.save();

    res.json({ expenses: user.expenses });
  } catch (error) {
    console.error('Delete Expense Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// Passwort zurücksetzen
app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token und neues Passwort erforderlich' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Passwort erfolgreich zurückgesetzt' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

// Passwort vergessen
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email erforderlich' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Hier solltest du eine E-Mail mit dem Token senden
    console.log(`Passwort zurücksetzen Token für ${email}: ${token}`);

    res.json({ message: 'E-Mail zum Zurücksetzen des Passworts gesendet' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ error: 'Server Fehler' });
  }
});

//

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));