import React from 'react';
import Navbar from './first';
import Practice from './Practice';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function PracticeWithMic() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Practice with Microphone</h1>
        </div>
        <Practiceq />
      </div>
      <Footer />
    </div>
  );
}