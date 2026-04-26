const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  gender: String,
  email: String,
  phoneNumber: String,
  description: String,
  skills: [String],
  collegeName: String,
  degreeName: String,
  graduationStartYear: String,
  graduationEndYear: String,
  class10Marks: String,
  class12Marks: String,
  resumeFileName: String,
});

module.exports = mongoose.model("Student", studentSchema);