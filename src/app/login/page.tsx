
"use client"
import React, { useState } from 'react';
import Title from '../../components/title';

import { signIn, useSession } from "next-auth/react";
import Google from 'next-auth/providers/google';
import { SessionProvider } from 'next-auth/react';


const Page = () => {


  const {data,status} = useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [loginError, setLoginError] = useState('');
  const [googleError, setGoogleError] = useState('');


  const Googlehandler = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      if (result && result.error) {
        setGoogleError(result.error);
        console.log(result.error)
      } 
        // User successfully signed in using Google
      else {

        if(status==='authenticated'){
          const username = data.user.name || '';
          console.log(username)
          const redirectUrl = `/Dashboard/${username}`;
          window.location.href = redirectUrl;


       
        }
          
        }
      
    } catch (error) {
      setGoogleError("Error in Google signin");
    }
  };




  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to dashboard
      window.location.href = `/Dashboard/${username}`;
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className='w-full'>
      <Title />
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-7 rounded sm:max-w-sm m-2 sm:mt-10"  >
        <h1 className='text-4xl text-center mb-14 font-bold' style={{ color: '#4E9F3D' }}>Login</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2 text-xl">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 leading-tight"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2 text-xl">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 leading-tight"
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2" style={{ backgroundColor: '#DD5746' }}>
            Login
          </button>

          <p className=' text-gray-700 font-bold mb-2 text-xl text-center'>or</p>

          <button type="button" className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" style={{ backgroundColor: '#1679AB' }} onClick={Googlehandler}>
            Continue with Google
          </button>

          
        </div>

        {loginError && (
          <p className="text-red-500 text-center">{loginError}</p>
        )}
         {googleError && (
          <p className="text-red-500 text-center">{googleError}</p>
        )}
      </form>
     
    </div>
  );
};



export default function LoginWrapper() {
  return (
    <SessionProvider session={null}> 
      <Page />
    </SessionProvider>
  );
}


