import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setting up express and port
const app = express();
const PORT = process.env.PORT;

app.use(morgan('combined'));

// Setting up cors to listen to localhost requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Setting up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initializing passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Setting up number of salt rounds for password hashing
const saltRounds = 10;

// Setting up bodyparser
app.use(bodyParser.json());

// Setting up database connection
const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Connecting to database
db.connect();

// Route for creating new card collections
app.post('/create_collection', async (req, res) => {
  const { collectionName, collectionDescription } = req.body.collectionData;
  const user_id = req.session.passport.user.user_id;

  if (!req.isAuthenticated()) {
    console.log('User is not authenticated'); // Debugging
  } else {
    console.log('User Authenticated');
  }

  try {
    if (req.isAuthenticated()) {
      const result = await db.query(
        'INSERT INTO collections (user_id, name, description) VALUES ($1, $2, $3) RETURNING *',
        [user_id, collectionName, collectionDescription]
      );

      res.status(201).json({
        success: true,
        redirect: '/dashboard',
        message: 'Collection Created',
      });
    } else {
      res
        .status(401)
        .json({ success: false, message: 'User not authenticated' });
    }
  } catch (error) {
    console.log('Error', error);
  }
});

app.get('/fetch/collections', async (req, res) => {
  const user_id = req.session.passport.user.user_id;

  try {
    if (req.isAuthenticated()) {
      const result = await db.query(
        'SELECT * FROM collections WHERE user_id = $1',
        [user_id]
      );

      res.status(200).json({ success: true, result: result.rows });
    } else {
      console.log('User not authenticated');
    }
  } catch (error) {
    console.error(error);
  }
});

app.get('/fetch/collection/:id', async (req, res) => {
  const user_id = req.session.passport.user.user_id;
  const collection_id = req.params.id;

  try {
    if (req.isAuthenticated()) {
      const result = await db.query("SELECT * FROM flashcards WHERE collection_id = ($1)", [collection_id])

      if (result) {
        console.log(result.rows)
      }
    }
  } catch (error) {
    
  }
});

// lets user register
app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const acceptTerms = req.body.acceptTerms;

  try {
    if (acceptTerms) {
      const checkResult = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (checkResult.rows.length > 0) {
        // Should Redirect To Login, because user already exists
        res.status(200).json({
          redirect: true,
          message: 'User already exists, redirecting to login',
        });
      } else {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            res
              .status(500)
              .json({ redirect: false, message: 'Internal server error.' });
          } else {
            const result = await db.query(
              'INSERT INTO users (email, password) values ($1, $2) RETURNING *',
              [email, hash]
            );
            console.log('Successfully registered user');
            res.status(201).json({
              redirect: true,
              message: 'Successfully registered. Redirecting to login',
            });
          }
        });
      }
    } else {
      res.status(401).json({
        redirect: false,
        message: 'Failed to accept terms and conditions',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ redirect: false, message: 'Database error.' });
  }
});

// Setting login route, authenticating user using passport.js
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const rememberMe = req.body.rememberMe;

    req.logIn(user, (err) => {
      if (err) return next(err);

      const cookieOptions = {
        httpOnly: true,
        secure: (process.env.NODE_ENV = 'development'),
        sameSite: 'strict',
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 0,
      };

      if (rememberMe) {
        req.session.cookie.maxAge = cookieOptions.maxAge;
      } else {
        req.session.cookie.maxAge;
      }

      return res.status(200).json({ success: true, redirect: '/dashboard' });
    });
  })(req, res, next);
});

// Setting up passport local strategy for user authentication using passport.js
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.log('Error comparing passwords:', err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb('User not found');
      }
    } catch (error) {
      console.log(err);
      return cb(err);
    }
  })
);

// Validates authentication before allowing access to protected pages
app.get('/auth/validate', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'User Not authenticated' });
  }
});

// Logs user out and destroys session
app.get('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) return next(err);

      req.session.destroy((err) => {
        if (err) return next(err);

        // Clear the session cookie
        res.clearCookie('connect.sid', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
        });

        res.status(200).json({
          message: 'Logged out successfully',
          redirect: '/login',
        });
      });
    });
  } else {
    res.status(400).json({ message: 'No user logged in', redirect: '/login' });
  }
});

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Server listening on specified port
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
