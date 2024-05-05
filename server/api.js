const pool = require('./db/config.js');

async function allTasks(req, res) {
  const username = req.params.username;
  try {
   
    const result = await pool.query('SELECT * FROM tasks WHERE username = $1', [username]);
     // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching all tasks:', error.message);
    res.status(500).send('Server error');
  }
}

// Get important tasks
async function importantTasks(req, res) {
  const username = req.params.username;
  try {
  
    const result = await pool.query("SELECT * FROM tasks WHERE importance = 'high' and username = $1", [username]);
  // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching important tasks:', error.message);
    res.status(500).send('Server error');
  }
}

// Get tasks for today
async function todayTasks(req, res) {
  const username = req.params.username;
  try {
   
    const result = await pool.query("SELECT * FROM tasks WHERE date = CURRENT_DATE and username = $1", [username]);
     // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks for today:', error.message);
    res.status(500).send('Server error');
  }
}

// Get completed tasks
async function completedTasks(req, res) {
  const username = req.params.username;
  try {
   
    const result = await pool.query('SELECT * FROM tasks WHERE completed = true and username = $1', [username]);
    // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching completed tasks:', error.message);
    res.status(500).send('Server error');
  }
}


async function uncompletedTasks(req, res) {
  const username = req.params.username;
  try {
   
    const result = await pool.query('SELECT * FROM tasks WHERE completed = false and username = $1', [username]);
    // Release the client back to the pool
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching completed tasks:', error.message);
    res.status(500).send('Server error',error.message);
  }
}


async function longTermTasks(req, res) {
  const username = req.params.username;
  try {
    
    const result = await pool.query('SELECT * FROM tasks WHERE longterm = true and username = $1', [username]);
    // Release the client back to the pool
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching completed tasks:', error.message);
    res.status(500).send('Server error', error.message);
  }
}





async function createTask(req, res) {
  try {
    const { username, taskName, completed, importance, longTerm, date, taskDuration } = req.body;
    
    const newTask = await pool.query(
      'INSERT INTO tasks (username, taskname, completed, importance, longterm, date, taskduration) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [username, taskName, completed, importance, longTerm, date, taskDuration]
    );

    res.status(200).json(newTask.rows[0]);
  } catch (error) {
    console.error('Error adding task:', error.message);
    res.status(500).send('Server error');
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id; // Assuming task ID is passed as a route parameter

    console.log(taskId)

    const deletedTask = await pool.query(
      'DELETE FROM tasks WHERE  Taskid = $1 RETURNING *',
      [taskId]
    );

    if (deletedTask.rows.length === 0) {
      // If no task was deleted (task with specified ID not found)
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', deletedTask: deletedTask.rows[0] });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).send('Server error');
  }
}



async function updateTask(req, res) {
  const taskId = req.params.taskId; // Assuming task ID is passed as a route parameter
  const { taskName, completed, importance, longTerm, date, taskDuration } = req.body;

  try {
    const query = `
      UPDATE tasks
      SET taskname = $1, completed = $2, importance = $3, longterm = $4, date = $5, taskduration = $6
      WHERE Taskid = $7
      RETURNING *
    `;
    
    const values = [taskName, completed, importance, longTerm, date, taskDuration, taskId];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Task updated successfully', task: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).send('Server error');
  }
}





async function getTask(req, res){
  const taskId = req.params.taskId;

  try {
    const query = 'SELECT * FROM tasks WHERE Taskid = $1';
    const result = await pool.query(query, [taskId]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]); // Return the first task found (assuming taskId is unique)
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  allTasks,
  importantTasks,
  todayTasks,
  completedTasks,
  uncompletedTasks,
  createTask,
  longTermTasks,
  updateTask,
  deleteTask,
  getTask
};
