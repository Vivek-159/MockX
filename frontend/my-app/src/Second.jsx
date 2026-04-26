import React from 'react';

const Second = () => {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-800">Explore our platform features</h2>
          <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <span className="mr-2">See all</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-100">
                <svg className="w-24 h-24 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  <circle cx="12" cy="8" r="2" stroke="currentColor" fill="none" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <div className="bg-white rounded-md px-3 py-1 flex items-center shadow-md">
                  <span className="text-indigo-600 font-medium text-sm">InterviewPro</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                AI-Powered Resume Analyzer for Targeted Interview Prep
              </h3>

              <div className="mt-6 space-y-2">
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Skills Extraction
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Experience Analysis
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2">
                  Job Match Intelligence
                </span>
              </div>
            </div>
          </div>

         
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-100">
                <svg className="w-24 h-24 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <div className="h-6 w-36 bg-indigo-200 rounded-md mb-2"></div>
                  <div className="h-6 w-24 bg-indigo-300 rounded-md mb-2"></div>
                  <div className="h-6 w-32 bg-indigo-400 rounded-md"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <div className="bg-white rounded-md px-3 py-1 flex items-center shadow-md">
                  <span className="text-indigo-600 font-medium text-sm">InterviewPro</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Domain-Specific AI-Generated Interview Challenges
              </h3>

              <div className="mt-6 space-y-2">
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Generative AI Questions
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Technical Assessments
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2">
                  Domain Specialization
                </span>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-100">
                <svg className="w-24 h-24 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
                <div className="absolute bottom-4 right-4">
                  <div className="bg-indigo-600 h-12 w-24 rounded-md flex items-center justify-center text-white text-xs">
                    Performance: 85%
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <div className="bg-white rounded-md px-3 py-1 flex items-center shadow-md">
                  <span className="text-indigo-600 font-medium text-sm">InterviewPro</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Video & Text Interview Practice with Performance Analytics
              </h3>

              <div className="mt-6 space-y-2">
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Performance Metrics
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2 mb-2">
                  Video Interviews
                </span>
                <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full mr-2">
                  Improvement Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Second;