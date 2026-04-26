import React from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const First = () => {

  const user = localStorage.getItem("token");
  const nav = useNavigate();
  const handle = ()=>{
    localStorage.setItem("token","");
    location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-10 to-purple-300">
     
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">MockUpX</span>
          <span className="mt-0.5 text-xl font-bold text-indigo-700"></span>
          

        </div>
        <div className='flex items-center justify-center gap-6 text-indigo-700 text-xl font-bold'>
            <Link to="/practice" className="transition-transform duration-300 hover:scale-110">
              <h2>Questions</h2>
            </Link>
            {/* <Link to="/practice-questions">
              <h2>AI Questions</h2>
            </Link> */}
            <Link to="/practice-questions" className="transition-transform duration-300 hover:scale-110">
              <h2>Voice Practice</h2>
            </Link>
            <Link to="/meeting" className="transition-transform duration-300 hover:scale-110">
              <h2>Meeting</h2>
            </Link>
            <h2 onClick={() => nav("/user/resume")} className="cursor-pointer transition-transform duration-300 hover:scale-110">Resume</h2>
          </div>
        {!user && <Link to="/login"><button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-300 shadow-md">
          Login
        </button></Link>}
        {
          user && <button onClick={handle} className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-300 shadow-md">Logout</button>
        }

      </header>

     
      <main className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center">
      
        <div className="w-full md:w-1/2 mb-10 md:mb-0 mr-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Master your interviews with expert guidance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Our AI-powered platform helps you practice interviews in a low-pressure environment. Get real-time feedback and improve your skills with every session.
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            The result? You'll showcase your true potential, not just your resume.
          </p>
          <button 
            onClick={() => nav('/practice')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg text-lg font-medium shadow-lg flex items-center transition-all duration-300 transform hover:scale-105"
          >
            Start Practicing
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>

       
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="bg-indigo-100 rounded-xl p-4 md:p-6 relative">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-gray-500">Interview Session</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hi there! I'll be your interview coach today. Let's prepare you for your upcoming technical interview. Ready to start?
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start justify-end">
                  <div className="bg-indigo-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Yes, I'm ready! I'm a bit nervous about the algorithm questions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Don't worry! We'll start with some basics and work our way up. What's your experience with data structures?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => nav('/practice')}
              className="bg-red-400 text-white text-center py-2 px-4 rounded-lg absolute bottom-4 right-4 cursor-pointer hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-sm font-medium">Start Practicing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default First;