
const db = require('./config');
    
async function createtaskTable() {
    const client = db
  
    try {
      // Begin a transaction
      await client.query('BEGIN');
  
      // Define the SQL command to create a table
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Tasks (
        Taskid SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL ,
        Taskname VARCHAR(100) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        Importance VARCHAR(100) NOT NULL,
        Longterm BOOLEAN DEFAULT FALSE,
        Date DATE NOT NULL,
        Taskduration INT NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
  
      // Execute the create table query
      await client.query(createTableQuery);
  
      // Commit the transaction if successful
      await client.query('COMMIT');
  
      console.log('Table "Tasks" created successfully.');
    } catch (e) {
      // Rollback the transaction if any error occurs
      await client.query('ROLLBACK');
      console.error('Error creating table:', e);
    } 
  }
  
  // Call the function to create the table
  createtaskTable().catch(err => console.error('Error:', err));
  

