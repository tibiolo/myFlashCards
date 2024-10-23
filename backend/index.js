import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import pg from 'pg';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Setting up express and port
const app = express();
const PORT = process.env.PORT;

// Setting up bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

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

// Server listening on specified port
app.listen(PORT, console.log(`Server listening on port ${PORT}`));
