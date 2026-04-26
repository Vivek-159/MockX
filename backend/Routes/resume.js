// File upload setup

const express = require("express");
const router = express.Router();
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const multer = require("multer");
const axios = require("axios");
const Student = require("../Model/student");

const upload = multer({ dest: "uploads/" });
const GROQ_API_KEY = process.env.GROQ_API_KEY;



router.post('/uploadresume', upload.single("resume"), async (req, res) => {
    const filePath = req.file.path;
    let text = "";
    
    try {
      if (req.file.mimetype === "application/pdf") {
        const data = await pdfParse(filePath);
        text = data.text;
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ path: filePath });
        text = result.value;
        
      }
  
      
      const extractedData = await extractResumeData(text);
      

      if (!extractedData) {
        return res
          .status(500)
          .json({ error: "Error extracting data from resume" });
      }
  
      res.json(extractedData);
    } catch (error) {
      console.error("Error processing resume:", error);
      res.status(500).json({ error: "Error processing resume" });
    }
});
  
  
router.post('/savestudent', async (req, res) => {
    try {
      const student = new Student(req.body);
      console.log(req.body)
      await student.save();
      res.status(200).json({ message: "Student data saved successfully" });
    } catch (error) {
      console.error("Error saving student data:", error);
      res.status(500).json({ error: "Error saving student data" });
    }
});
  
const extractResumeData = async (resumeText) => {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Extract the following details from the resume in *strict JSON format*:
    
                      - *name*: Full name of the candidate (e.g., "John Doe").
                      - *dateOfBirth*: Candidate's date of birth in DD-MM-YYYY or YYYY-MM-DD format (e.g., "1995-05-15").
                      - *gender*: Candidate's gender (e.g., "Male", "Female", "Non-binary").
                      - *email*: Candidate's email address (e.g., "john.doe@gmail.com").
                      - *phoneNumber*: Candidate's phone number (e.g., "9832548965"). If the length is not 10 or 12 digits, leave it as an empty string.
                      - *description*: A brief summary about the candidate from their resume (e.g., "Experienced software engineer with expertise in backend development").
                      - *skills: A list of technical and soft skills as an **array of strings* (e.g., ["JavaScript", "Node.js", "Teamwork"]). If no skills are found, return an empty array.
                      - *collegeName*: Name of the university or college attended (e.g., "Stanford University").
                      - *degreeName*: Degree obtained (e.g., "Bachelor of Technology in Computer Science").
                      - *graduationStartYear*: The year the candidate started their degree (format: YYYY, e.g., "2018").
                      - *graduationEndYear*: The year the candidate completed or expects to complete their degree (format: YYYY, e.g., "2022").
                      - *currentlyStudyingYear*: The current year of study (e.g., "3rd Year").
                      - *class10Marks*: Marks or percentage in Class 10 (e.g., "95%"). If not available, return an empty string.
                      - *class12Marks*: Marks or percentage in Class 12 (e.g., "92%"). If not available, return an empty string.
                      - *resumeFileName*: The name of the resume file uploaded (e.g., "John_Doe_Resume.pdf").
    
                      ### *Rules:*
                      1. If any information is *not available, return an **empty string ("")* or an *empty array ([])* for skills.
                      2. Ensure the response is in *strict JSON format*.
                      3. Do *not* add any extra text before or after the JSON.
                      4. Use *structured parsing* for accurate data extraction.
                      
                      ### *Example JSON Output:*
                      \`\`\`json
                      {
                          "name": "John Doe",
                          "dateOfBirth": "1995-05-15",
                          "gender": "Male",
                          "email": "john.doe@gmail.com",
                          "phoneNumber": "9832548965",
                          "description": "Experienced software engineer with expertise in backend development.",
                          "skills": ["JavaScript", "Node.js", "Teamwork"],
                          "collegeName": "Stanford University",
                          "degreeName": "Bachelor of Technology in Computer Science",
                          "graduationStartYear": "2018",
                          "graduationEndYear": "2022",
                          "currentlyStudyingYear": "4th Year",
                          "class10Marks": "95%",
                          "class12Marks": "92%",
                          "resumeFileName": "John_Doe_Resume.pdf"
                      }
                      \`\`\`
    
                      ### *Resume Text:**
                      ${resumeText}`
            }
          ],
          temperature: 0.2,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
          },
        }
      );
  
    
      let extractedData =
        response.data.choices[0].message.content.trim();
      extractedData = extractedData.replace(/```json\n?|```/g, "").trim();
  
     
      let parsedData = JSON.parse(extractedData);
  
      
      return {
        name: parsedData.name || "",
        dateOfBirth: parsedData.dateOfBirth || "",
        gender: parsedData.gender || "",
        email: parsedData.email || "",
        phoneNumber: parsedData.phoneNumber || "",
        description: parsedData.description || "",
        skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
        collegeName: parsedData.collegeName || "",
        degreeName: parsedData.degreeName || "",
        graduationStartYear: parsedData.graduationStartYear || "",
        graduationEndYear: parsedData.graduationEndYear || "",
        currentlyStudyingYear: parsedData.currentlyStudyingYear || "",
        class10Marks: parsedData.class10Marks || "",
        class12Marks: parsedData.class12Marks || "",
        resumeFileName: parsedData.resumeFileName || "",
      };
    } catch (error) {
      console.error(
        "Error extracting data with Groq API:",
        error.response ? error.response.data : error.message
      );
      console.error(error)
      return {
        name: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        description: "",
        skills: [],
        collegeName: "",
        degreeName: "",
        graduationStartYear: "",
        graduationEndYear: "",
        currentlyStudyingYear: "",
        class10Marks: "",
        class12Marks: "",
        resumeFileName: "",
      };
    }
};
module.exports = {router};