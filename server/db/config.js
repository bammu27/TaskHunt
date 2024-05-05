
const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TaskHunt",
    password: "236018br#",
    port: 5432,
  });
  

  db.connect((err) => { 
    if (err) {
      console.log('Error connecting to the database', err.stack);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports = db;
