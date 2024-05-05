// pages/index.js

import React from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import Link from 'next/link';


const Page = ({params}) => {
  const username = params.username.replace(/%20/g, ' ');

  return (
    <div >
      <Sidebar username={username} />
      <Link href={`/Dashboard/${username}/addtask`}  className="m-2 w-5 p-3 text-white text-xl font-bold bg-lime-600 rounded-lg">
          Add Task
        </Link>
      
    
    </div>
  );
};


export default Page;
