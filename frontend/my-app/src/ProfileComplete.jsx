import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProfileComplete = () => {
  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    description: "",
    skills: "",
    collegeName: "",
    degreeName: "",
    graduationStartYear: "",
    graduationEndYear: "",
    class10Marks: "",
    class12Marks: "",
  });

  const [resume, setResume] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFileName(file.name);
      setResume(file);
      const formData = new FormData();
      formData.append("resume", file);

      try {
        setLoading(true); 
        const response = await fetch("http://localhost:3000/user/uploadresume", {
          method: "POST",
          body: formData, 
        }); 
        
        if (response.status === 500) {
          const errorText = await response.text();
          console.error("Server response:", errorText);
          throw new Error(`Failed to upload resume: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resume upload successful:", data);

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: data.name || prevFormData.name,
          dateOfBirth: data.dateOfBirth || prevFormData.dateOfBirth,
          gender: data.gender || prevFormData.gender,
          email: data.email || prevFormData.email,
          phoneNumber: data.phoneNumber || prevFormData.phoneNumber,
          description: data.description || prevFormData.description,
          skills: data.skills?.length > 0 ? data.skills.join(", ") : prevFormData.skills,
          collegeName: data.collegeName || prevFormData.collegeName,
          degreeName: data.degreeName || prevFormData.degreeName,
          graduationStartYear: data.graduationStartYear || prevFormData.graduationStartYear,
          graduationEndYear: data.graduationEndYear || prevFormData.graduationEndYear,
          currentYearOfStudy: data.currentYearOfStudy || prevFormData.currentYearOfStudy,
          class10Marks: data.class10Marks || prevFormData.class10Marks,
          class12Marks: data.class12Marks || prevFormData.class12Marks,
          resumeFileName: data.resumeFileName || prevFormData.resumeFileName,
        }));
      } catch (error) {
        console.error("Error uploading resume:", error);
        setErrorMessage("Failed to upload resume. Please try again.");
      } finally {
        setLoading(false); 
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const requiredFields = [
      "name",
      "email",
      "phoneNumber",
      "dateOfBirth",
      "gender",
      "collegeName",
      "degreeName",
      "graduationStartYear",
      "graduationEndYear",
      "class10Marks",
      "class12Marks",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    try {
      setLoading(true); 
      const submitData = new FormData();

      for (const key in formData) {
        submitData.append(key, formData[key]);
      }

      if (resume) {
        submitData.append("resume", resume);
      }

      const response = await fetch("http://localhost:3000/user/savestudent", {
        method: "POST",
        body: submitData,
      });

      if(response.status !== 200) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error(`Failed to save student data: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submission successful:", result);
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving student data:", error);
      setErrorMessage("Failed to submit form. Please check your connection and try again.");
    } finally {
      setLoading(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 animate-fadeIn">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Profile Completed!</h2>
          </div>
          <p className="text-gray-600 text-center text-lg mb-8">
            Your profile has been successfully created. Unlock your potential and land your dream job with MockUp X.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 shadow-md text-lg"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
              </svg>
              Back
            </button>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600">
              MockUp X
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/practice" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">
              Questions
            </Link>
            <Link to="/user/resume" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300">
              Resume
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 py-2 px-6 rounded-lg transition duration-300 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition duration-300 font-medium shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">
                Help us customize your interview preparation experience
              </p>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Resume Upload Section */}
            <div className="mb-10">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">Quick Profile Setup</h3>
                <p className="text-gray-600 mb-4">
                  Upload your resume to automatically fill in your profile details
                </p>
                <div
                  className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:bg-indigo-100/50 transition-colors"
                  onClick={() => document.getElementById("resume-upload").click()}
                >
                  {loading ? (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-indigo-600 mt-4 font-medium">Processing resume...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-indigo-600 font-medium mb-1">
                        {resumeFileName ? resumeFileName : "Upload your resume"}
                      </p>
                      <p className="text-gray-500 text-sm">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  )}
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "personal"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "education"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("education")}
              >
                Educational Information
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Tab */}
              <div className={activeTab === "personal" ? "block" : "hidden"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-500">*</span></label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g. JavaScript, React, Node.js (comma separated)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">About Yourself</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Share a brief description about yourself..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab("education")}
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Next: Education
                  </button>
                </div>
              </div>

              {/* Educational Information Tab */}
              <div className={activeTab === "education" ? "block" : "hidden"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">College/University Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your college/university name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Degree <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="degreeName"
                      value={formData.degreeName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="e.g. B.Tech Computer Science"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Start Year <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="graduationStartYear"
                      value={formData.graduationStartYear}
                      onChange={handleChange}
                      placeholder="YYYY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">End Year <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="graduationEndYear"
                      value={formData.graduationEndYear}
                      onChange={handleChange}
                      placeholder="YYYY"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Class 10 Marks (%) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="class10Marks"
                      value={formData.class10Marks}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="e.g. 92.5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Class 12 Marks (%) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="class12Marks"
                      value={formData.class12Marks}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="e.g. 88.2"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab("personal")}
                    className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                  >
                    Back to Personal Info
                  </button>
                  
                  <button
                    type="submit"
                    className={`py-3 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Complete Profile"
                    )}
                  </button>
                </div>
              </div>
            </form>

            <p className="text-xs text-gray-500 text-center mt-8">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 mt-16">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MockUp X. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileComplete;