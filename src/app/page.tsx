'use client'
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
 

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold text-center mb-6">Manage Your Tasks Effortlessly</h1>
        <p className="text-lg text-center mb-8">
          Simplify your life with our intuitive task management platform. Stay organized, focused, and productive.
        </p>
        <div className="flex space-x-4">
          {/* Conditional rendering based on username */}
         
            <Link href="/signup"  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            
                Get Started for Free
              
            </Link>
       
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
