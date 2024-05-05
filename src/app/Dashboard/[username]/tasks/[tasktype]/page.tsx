'use client'
import Sidebar from '@/components/dashboard/sidebar'
import Link from 'next/link'
import  api  from '../../../../utils/all'
import React, { useEffect, useState } from 'react';

import TaskPage from '@/components/dashboard/tasklist';


interface Task {
  taskid: number;
  taskname: string;
  username: string;
  importance: string;
  completed: boolean;
  longterm: boolean;
  date: string;
  taskduration: number;
  created_at: string;
  completed_at: string;
}

interface Props {
  params: {
    username: string;
    tasktype: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const username = params.username.replace(/%20/g, ' ');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const baseURL = 'http://localhost:5000/api'
      const criteria = params.tasktype.replace(/%20/g, ' ');
   
      const url = `${baseURL}/${criteria}/${username}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const Tasks = await response.json();
        console.log(Tasks)
        setTasks(Tasks);// Process tasks data received from the server
       
      } catch (error:any) {
        console.error('Error fetching tasks:', error.message);
        return null;
      }
        

    };

    fetchData();
  }, []);

  
   

  return (
    <div className="flex">
      <Sidebar username={username} />
      <div className="">
      <h1 className="text-3xl font-bold mx-auto text-center text-rose-400 ">{params.tasktype}Tasks List</h1>
        

        <TaskPage tasks={tasks} setTasks={setTasks} />

        <div className='flex justify-center items-center '>

        <Link href={`/Dashboard/${username}/addtask`}  className="inline-block px-6 py-3 text-white text-xl font-bold rounded-lg" style={{backgroundColor:'#874CCC'}}>
          Add Task
        </Link>
        </div>

        
      </div>
    </div>
  );
};

export default Page;
