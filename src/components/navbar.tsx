import Link from 'next/link';
import Title from './title';

const Navbar = () => {
  return (
    <nav >
      <div className="container mx-auto flex justify-between items-center mt-2">
        <div className="text-white font-bold text-xl"><Title/></div>
        <div className="flex space-x-4">
          <Link href="/login" className="text-xl font-bold hover:text-blue-300 p-2 rounded-md ml-2  text-white font-mono" style={{backgroundColor:'#8DECB4'}}>
             Login
          </Link>
          <Link href="/Signup" className="text-xl font-bold hover:text-blue-300 bg-yellow-400 p-2 rounded-md text-white font-mono" style={{backgroundColor:'#7469B6'}}>
             signup
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
