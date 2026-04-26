import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const jobRoles = [
  "Software Engineer",
  "Data Analyst",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cybersecurity Analyst",
  "Frontend Developer",
  "Backend Developer",
  "Cloud Engineer",
];

const difficultyLevels = ["Easy", "Medium", "Hard"];

const API_BASE = "http://localhost:3000/api";

export default function Practice() {
  const [selectedRole, setSelectedRole] = useState(jobRoles[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevels[0]);
  const [numQuestions, setNumQuestions] = useState(2);
  const [qaList, setQaList] = useState([]); // [{ question, answer }]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAnswers, setShowAnswers] = useState({});
  const [activeTab, setActiveTab] = useState("generator");
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setQaList([]);
    setShowAnswers({});

    try {
      const response = await axios.post(`${API_BASE}/questions`, {
        role: selectedRole,
        difficulty: selectedDifficulty,
        count: numQuestions,
      });

      const { questions } = response.data;

      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("No questions received");
      }

      setQaList(questions);
      setActiveTab("questions");
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to generate questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (index) => {
    setShowAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-16">
      {/* HEADER */}
      <header className="bg-white shadow-md py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-red-600">MockUpX</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* ── GENERATOR TAB ── */}
        {activeTab === "generator" && (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">
              Prepare for your tech interview
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              {/* ROLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {jobRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* DIFFICULTY */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level)}
                      className={`flex-1 p-2 rounded-lg font-medium transition-colors ${selectedDifficulty === level
                        ? "bg-blue-600 text-white transition-all duration-300 transform hover:scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* COUNT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions (max 10 for free tier)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numQuestions}
                  onChange={(e) =>
                    setNumQuestions(Math.min(10, Math.max(1, +e.target.value)))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SUBMIT */}
              <button
                onClick={fetchQuestions}
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Questions"
                )}
              </button>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {error}
                </p>
              )}
            </div>
          </>
        )}

        {/* ── QUESTIONS TAB ── */}
        {activeTab === "questions" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedRole} —{" "}
                <span className="text-blue-600">{selectedDifficulty}</span>
              </h2>
              <span className="text-sm text-gray-500">
                {qaList.length} question{qaList.length !== 1 ? "s" : ""}
              </span>
            </div>

            {qaList.map((qa, i) => (
              <div
                key={i}
                className="bg-white p-5 mb-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                {/* Question */}
                <p className="font-semibold text-gray-900">
                  <span className="text-blue-600 mr-2">{i + 1}.</span>
                  {qa.question}
                </p>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleAnswer(i)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  {showAnswers[i] ? "▲ Hide Answer" : "▼ View Answer"}
                </button>

                {/* Answer */}
                {showAnswers[i] && (
                  <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {qa.answer || "Answer not available"}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* BACK BUTTON */}
            <button
              onClick={() => {
                setActiveTab("generator");
                setQaList([]);
                setShowAnswers({});
              }}
              className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors"
            >
              ← Generate New
            </button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
