const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db/config.js');
const jwt = require("jsonwebtoken")
const cors = require('cors');
const { error } = require('console');
const dotenv = require('dotenv');

const user = require('./db/user.js');
const task = require('./db/task.js');


const api = require('./api.js');

dotenv.config();
const app = express();

const PORT =  5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Hash the password
      const saltRounds = 10;

      if(!username || !email || !password) {
        return res.status(401).json({message: 'Please fill in all fields'});
      }

      const q_username = 'SELECT * FROM users WHERE username = $1';
      
      const result_username = await pool.query(q_username, [username]);

      if (result_username.rows.length > 0) {

       
        return res.status(400).json({message: 'Username already exists'});
      }

      const q_email = 'SELECT * FROM users WHERE email = $1';

      const result_email = await pool.query(q_username, [email]);

      if (result_email.rows.length > 0) {

        
        return res.status(400).json({message: 'email already exists'});
      }

     
      const Password = await bcrypt.hash(password, saltRounds);
  
      // Insert user into the database
      const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id';
      const result = await pool.query(query, [username, email, Password]);
  
      const user = result.rows[0]
  
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send(error);
    }
  });
  

 // User login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Retrieve user from the database by email
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
  
      const user = result.rows[0];
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign({ username: user.username, email: user.email },process.env.JWT_SECRET , { expiresIn: '1h' });
      
      res.json({ token ,user: { username: user.username, email: user.email }});
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('An error occurred during login');
    }
  });
  



  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userId = decoded.userId;
        next();
    });
}



  app.post('/api/createTask', api.createTask);
  app.get('/api/all/:username', api.allTasks);
  app.get('/api/today/:username', api.todayTasks);
  app.get('/api/completed/:username', api.completedTasks);
  app.get('/api/uncompleted/:username', api.uncompletedTasks);
  app.get('/api/longTerm/:username', api.longTermTasks);
  app.delete('/api/tasks/:id', api.deleteTask);
  app.put('/api/updatetask/:taskId',api.updateTask)
  app.get('/api/task/:taskId' ,api.getTask)
  app.get('/api/important/:username',api.importantTasks)



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }

   );



