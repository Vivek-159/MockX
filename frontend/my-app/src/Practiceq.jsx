import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from './Footer';
 
const TechnicalAssessment = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState(null);
  const recognitionRef = useRef(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const [recordingQuestionId, setRecordingQuestionId] = useState(null);

  // Define questions for each topic
  const topics = {
    behavioral: {
      title: "Behavioral Questions",
      questions: {
        "Tell us about a time you faced a challenging situation in a team?": "",
        "How do you handle disagreements with team members?": "",
        "Describe a situation where you had to meet a tight deadline": ""
      }
    },
    oops: {
      title: "Object-Oriented Programming",
      questions: {
        "Explain the four pillars of OOP with examples": "",
        "What is the difference between abstract class and interface?": "",
        "Explain polymorphism with a coding example": ""
      }
    },
    cn: {
      title: "Computer Networks",
      questions: {
        "Explain the OSI model layers and their functions": "",
        "What happens when you type a URL in a browser and press Enter?": "",
        "Explain the difference between TCP and UDP protocols": ""
      }
    },
    dbms: {
      title: "Database Management Systems",
      questions: {
        "What are the different normal forms in database normalization?": "",
        "Explain the difference between clustered and non-clustered indexes": "",
        "What is ACID property in database transactions?": ""
      }
    }
  };

  // Check if browser supports speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceSupported(true);
    }
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSubmitted(false);
    setScores(null);
    setErrorMessage(false);
  };

  const handleAnswerChange = (question, value) => {
    if (!selectedTopic) return;
    
    const updatedQuestions = { ...topics[selectedTopic].questions };
    updatedQuestions[question] = value;
    
    topics[selectedTopic].questions = updatedQuestions;
  };

  const startRecording = (question) => {
    if (!isVoiceSupported) {
      setErrorMessage("Speech recognition is not supported in your browser");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      let finalTranscript = '';
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update the answer field with the current transcription
        handleAnswerChange(question, finalTranscript + interimTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setErrorMessage(`Speech recognition error: ${event.error}`);
        stopRecording();
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      setRecordingQuestionId(question);
    } catch (error) {
      console.error('Error starting speech recognition', error);
      setErrorMessage("Failed to start speech recognition");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setRecordingQuestionId(null);
  };

  const handleSubmitForEvaluation = async () => {
    if (!selectedTopic) return;
    
    setLoading(true);
    setErrorMessage(false);
    
    try {
      const response = await axios.post('http://localhost:3000/api/evaluate', {
        topic: selectedTopic,
        topicTitle: topics[selectedTopic].title,
        answers: topics[selectedTopic].questions
      });
      
      setScores(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting for evaluation', error);
      setErrorMessage("Failed to evaluate your answers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 relative">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors z-10"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-blue-600 absolute left-1/2 transform -translate-x-1/2 text-center w-full md:w-auto pointer-events-none">AI Interview Questions</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto border border-gray-200">
          {!selectedTopic ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Select a Topic</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(topics).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicSelect(topic)}
                    className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg text-blue-600 font-medium transition duration-300"
                  >
                    {topics[topic].title}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">{topics[selectedTopic].title}</h2>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Change Topic
                </button>
              </div>
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-500 text-red-700 rounded-lg">
                  <p>{errorMessage}</p>
                </div>
              )}
              
              {!submitted ? (
                <>
                  <div className="space-y-6">
                    {Object.keys(topics[selectedTopic].questions).map((question, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
                        <p className="font-medium text-gray-900 mb-2">Question {index + 1}: {question}</p>
                        <div className="flex flex-col space-y-2">
                          <textarea
                            value={topics[selectedTopic].questions[question]}
                            onChange={(e) => handleAnswerChange(question, e.target.value)}
                            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            rows="4"
                            placeholder="Type your answer here..."
                          />
                          
                          {isVoiceSupported && (
                            <div className="flex justify-end">
                              {isRecording && recordingQuestionId === question ? (
                                <button
                                  onClick={stopRecording}
                                  className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                                  </svg>
                                  Stop Recording
                                </button>
                              ) : (
                                <button
                                  onClick={() => startRecording(question)}
                                  className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                                  </svg>
                                  Record Answer
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitForEvaluation}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 shadow-md disabled:opacity-50"
                    >
                      {loading ? 'Evaluating...' : 'Submit for Evaluation'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Evaluation Results</h3>
                      <div className="text-3xl font-bold text-blue-600">{scores.score}/100</div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-2">Overall Feedback</h4>
                      <p className="text-gray-700">{scores.feedback}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Detailed Feedback</h4>
                      <div className="space-y-4">
                        {Object.entries(scores.detailedFeedback).map(([question, feedback], index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="font-medium text-blue-600 mb-1">{question}</p>
                            <p className="text-gray-700">{feedback}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-300"
                    >
                      Edit Answers
                    </button>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
                    >
                      Try Another Topic
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default TechnicalAssessment;