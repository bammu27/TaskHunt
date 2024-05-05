
const db = require('./config');
    
async function createTable() {
    const client = db
  
    try {
      // Begin a transaction
      await client.query('BEGIN');
  
      // Define the SQL command to create a table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;
  
      // Execute the create table query
      await client.query(createTableQuery);
  
      // Commit the transaction if successful
      await client.query('COMMIT');
  
      console.log('Table "users" created successfully.');
    } catch (e) {
      // Rollback the transaction if any error occurs
      await client.query('ROLLBACK');
      console.error('Error creating table:', e);
    } 
  }
  
  // Call the function to create the table
  createTable().catch(err => console.error('Error:', err));
  

