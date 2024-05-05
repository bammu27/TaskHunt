"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Title from '../../components/title';

const Page = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SignupError,setSignupError] = useState('')

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful, redirect to login page
        window.location.href = '/login';
      } else {
        // Handle different error messages
        if (data.message) {
          setSignupError(data.message)
        } else {
          setSignupError('Signup failed');
        }
        setUsername('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          setSignupError(''); // Clear the input value after 5 seconds
        }, 5000);



       
      }
    } catch (error) {
      

      setSignupError('Signup failed');
      setUsername('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setSignupError(''); // Clear the input value after 5 seconds
      }, 5000);


      
    }
  };

  return (
    <div className="w-full">
      <Title />
      <form onSubmit={handleSubmit} className="mx-auto mt-20 p-10 rounded sm:max-w-sm m-10 sm:mt-10" style={{ backgroundColor: '#FFE0B5' }}>
        <h1 className="text-3xl text-center mb-14 font-bold" style={{ color: '#CA2E55' }}>
          Create your account
        </h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2 text-xl">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 leading-tight"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2 text-xl">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 leading-tight"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2 text-xl">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 leading-tight"
          />
        </div>
        <h2 className="p-2 mt-2 text-gray-700 font-bold text-lg">
          Already have an account? <Link href="/login">Login</Link>
        </h2>
        <div className="mb-4">
          <button type="submit" className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2" style={{ backgroundColor: '#CA2E55' }}>
            Signup
          </button>
          
        </div>
      </form>
      {SignupError && (
          <p className="text-red-500 text-center font-bold text-xl " > {SignupError}</p>
        )}
    </div>
  );
};

export default Page;
