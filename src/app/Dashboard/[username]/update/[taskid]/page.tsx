'use client'
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

const page = ({ params }:any) => {
  const taskId = params.taskid; // Assuming taskId is passed as a route parameter
  const username = params.username.replace(/%20/g, ' ');
  const router = useRouter();


  useEffect(() => {
    // Fetch task details based on taskId
    const fetchTaskDetails = async () => {
      console.log(taskId)
      try {
        const response = await fetch(`http://localhost:5000/api/task/${taskId}`);
        if (response.ok) {
          const taskData = await response.json();
          console.log(taskData)
          setFormData({
            taskName: taskData.taskname,
            completed: taskData.completed,
            importance: taskData.importance,
            longTerm: taskData.longterm,
            date: taskData.date,
            taskDuration: taskData.taskduration
          });
        } else {
          throw new Error('Task not found');
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
        setUpdateError('Error fetching task details');
      }
    };

    fetchTaskDetails();
  }, [taskId]);



  const [formData, setFormData] = useState({
    taskName: '',
    completed: false,
    importance: '',
    longTerm: false,
    date: '',
    taskDuration: ''
  });

  const [updateError, setUpdateError] = useState('');

 

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const taskId = params.taskid
    try {
      const response = await fetch(`http://localhost:5000/api/updatetask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        router.push(`/Dashboard/${username}/tasks/all`);
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      setUpdateError('Error updating task');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={formData.taskName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="completed" className="font-semibold">
            Completed
          </label>
        </div>
        <input
          type="text"
          name="importance"
          placeholder="Importance"
          value={formData.importance}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="longTerm"
            checked={formData.longTerm}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="longTerm" className="font-semibold">
            Long Term
          </label>
        </div>
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="number"
          name="taskDuration"
          placeholder="Task Duration"
          value={formData.taskDuration}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Update Task
        </button>
      </form>

      {updateError && (
        <p className="text-red-500 text-center mt-4">{updateError}</p>
      )}
    </div>
  );
};

export default page;
