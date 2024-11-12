import express from 'express';
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

// Setting up cors to listen to localhost requests
app.use(cors());

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

app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      // Should Redirect To Login, because user already exists
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const result = await db.query(
            'INSERT INTO users (email, password) values ($1, $2) RETURNING *',
            [email, hash]
          );
          console.log('Successfully registered user');
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Setting login route, authenticating user using passport.js
app.post('/login', (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  });
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

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Server listening on specified port
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
