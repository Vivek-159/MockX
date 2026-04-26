const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const { userRouter } = require("./Routes/user");
const { router: resumeRouter } = require("./Routes/resume");
const practiceRouter = require("./Routes/practice");
const interviewRouter = require("./Routes/interview");

const app = express();
const port = Number(process.env.PORT) || 3000;


/* -------------------- MIDDLEWARES -------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

/* -------------------- ROUTES -------------------- */
app.use("/", userRouter);
app.use("/user", resumeRouter);
app.use("/interviews", interviewRouter);
app.use("/api", practiceRouter);

/* -------------------- DATABASE -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* -------------------- SERVER -------------------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
