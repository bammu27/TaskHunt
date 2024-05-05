'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/router' instead of 'next/navigation'

const TasksPage = ({ tasks, setTasks}:any) => {
  const router = useRouter(); // Initialize useRouter hook

  const[deleteError ,setdeleteError] = useState('')
  const [completeError,setcompleteError] = useState('')

  const deletehandle = async (taskId: any, username: any) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, { 
        method: 'DELETE'
      });

      if (response.ok) {
        // Task deleted successfully from server, update local state
        const updatedTasks = tasks.filter((task: { taskid: any; }) => task.taskid !== taskId);
        setTasks(updatedTasks);
        router.push(`/Dashboard/${username}/tasks/all`);

      } else {
        setdeleteError('Failed to delete task');

      }
    } catch (error:any) {
      setdeleteError('Error deleting task:');
    }
  };


  const updatehandle = (taskId: any, username: any)=>{

   
    router.push(`/Dashboard/${username}/update/${taskId}`)
   


  }









  if (!Array.isArray(tasks)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Task List</h1>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task.taskid}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <p className="text-sm text-gray-600 mb-2">Task ID: {task.taskid}</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{task.taskname}</h2>
            <p className="text-md text-gray-900 mb-2 font-semibold">Username: {task.username}</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Importance: {task.importance}</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Completed: {task.completed ? 'Yes' : 'No'}</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Long Term: {task.longterm ? 'Yes' : 'No'}</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Date: {task.date}</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Task Duration: {task.taskduration} hour</p>
            <p className="text-md text-gray-900 mb-2 font-semibold">Created At: {task.created_at}</p>
            {task.completed&&<p className="text-md text-gray-600 mb-2 font-semibold">Completed At: {task.completed_at}</p>}

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => deletehandle(task.taskid, task.username)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => updatehandle(task.taskid, task.username)}
              >
                Update
              </button>




            </div>

           {deleteError&&<p className='text-rose-500 mt-2 font-semibold'>{deleteError}</p>}
           {deleteError&&<p className='text-rose-500 mt-2 font-semibold'>{completeError}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
