import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setting up express and port
const app = express();
const PORT = process.env.PORT;

// Setting up cors to listen to localhost requests
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow cookies to be sent
  })
);

// Setting up session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
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


// lets user register
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      // Should Redirect To Login, because user already exists
      res.status(200).json({
        redirect: true,
        message: "User already exists, redirecting to login",
      });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          res
            .status(500)
            .json({ redirect: false, message: "Internal server error." });
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) values ($1, $2) RETURNING *",
            [email, hash]
          );
          console.log("Successfully registered user");
          res.status(201).json({
            redirect: true,
            message: "Successfully registered. Redirecting to login",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ redirect: false, message: "Database error." });
  }
});

// Setting login route, authenticating user using passport.js
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, redirect: "/dashboard" });
    });
  })(req, res, next);
});

// Setting up passport local strategy for user authentication using passport.js
passport.use(
  new LocalStrategy({ usernameField: "email" }, async function verify(
    email,
    password,
    cb
  ) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.log("Error comparing passwords:", err);
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
        return cb("User not found");
      }
    } catch (error) {
      console.log(err);
      return cb(err);
    }
  })
);

// Validates authentication before allowing access to protected pages
app.get("/auth/validate", (req, res) => {
  if (req.isAuthenticated) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "User Not authenticated" });
  }
});


// Logs user out and destroys session
app.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }

        res
          .status(200)
          .json({ message: "Logged out Successfully", redirect: "/login" });
      });
    });
  } else {
    res.status(400).json({ message: "No user logged in", redirect: "/login" });
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
