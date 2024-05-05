// pages/AddTask.js
'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = ({params}:any) => {

  const username = params.username.replace(/%20/g, " ")
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: username ,
    taskName: '',
    completed: false,
    importance: '',
    longTerm: false,
    date: '',
    taskDuration: ''
  });


  const [addError, setAddError] = useState('');





  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handlebinChange = (e: { target: { name: any; checked: any; }; }) => {

    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        
          router.push(`/Dashboard/${username}/tasks/all`);


        // Reset form fields or show success message
      } else {
        setAddError('Failed to add task.');

        setTimeout(() => {
          setAddError('');
        }, 5000);
      }
    } catch (error) {
      setAddError('Error adding task:');
      setTimeout(() => {
        setAddError('');
      }, 5000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="taskname"
          value={formData.taskName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handlebinChange}
            className="mr-2"
          />
          <label htmlFor="completed" className="font-semibold">Completed</label>
        </div>
        <input
          type="text"
          name="importance"
          placeholder="importance"
          value={formData.importance.toLocaleLowerCase()}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"     
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="longTerm"
            checked={formData.longTerm}
            onChange={handlebinChange}
            className="mr-2"
          />
          <label htmlFor="longTerm" className="font-semibold">Long Term</label>
        </div>
        <input
          type="date"
          name="date"
          placeholder="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="int"
          name="taskDuration"
          placeholder="taskDuration"
          value={formData.taskDuration}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

    {addError && <p className="text-red-500 text-center mt-4">{addError}</p>}
    
    </div>
  );
};

export default page;
