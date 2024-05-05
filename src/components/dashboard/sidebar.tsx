
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import {post, roboto} from '../../lib/font';

interface SidebarProps {
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  return (
    <div className=" w-64 h-screen ml-4 mt-2"  style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}} >
        <div className={`${roboto.className}flex  items-center justify-center h-15 p-2  text-center  text-xl font-bold font-mono `} style={{color:'#FC4100'}}>
       {username}
      </div>
        
      <div className="flex items-center justify-center h-14 text-gray-700 text-xl font-bold" >
        Your Tasks 📝
      </div>
      <div className="p-4 font-bold text-pretty text-center" style={{color:'#492E87'}}>
        <ul>
        <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600"  style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={'/'}>
              Home
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600"  style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/all`}>
              All tasks
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600 text-center" style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/completed`}>
              Completed
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600" style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/uncompleted`}>
             Uncompleted
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600" style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/important`}>
             Important
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600" style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/today`}>
            Today
            </Link>
          </li>
          <li className="p-2 mb-3 hover:bg-yellow-400 rounded-lg hover:text-rose-600" style={{boxShadow: '2px 2px 8px rgb(0, 0, 0,0.8)'}}>
            <Link href={`/Dashboard/${username}/tasks/longterm`}>
             Longterm
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
