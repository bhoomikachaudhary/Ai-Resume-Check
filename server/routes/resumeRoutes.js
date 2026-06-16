const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const analyzeResumeWithAI = require("../services/aiService");
const Resume = require("../models/Resume");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    let aiAnalysis = "AI analysis unavailable";

    try {
      aiAnalysis = await analyzeResumeWithAI(resumeText);
    } catch (err) {
      console.log("AI ERROR:", err.message);
    }

    const skills = [
      "Java",
      "Python",
      "JavaScript",
      "React",
      "Spring Boot",
      "MongoDB",
      "MySQL",
      "Node.js",
      "Express",
      "Django",
      "Laravel",
      "Git",
      "HTML",
      "CSS",
      "Docker",
      "AWS",
      "Kubernetes",
      "REST API",
      "TypeScript",
    ];

    const detectedSkills = skills.filter((skill) =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    const missingSkills = skills.filter(
      (skill) => !detectedSkills.includes(skill)
    );

    // ==========================
    // ATS SCORE
    // ==========================

    let atsScore = 0;

    // Skills = 50 marks
    const skillScore =
      (detectedSkills.length / skills.length) * 50;

    atsScore += skillScore;

    // Important Sections
    if (/projects?/i.test(resumeText)) atsScore += 10;
    if (/experience/i.test(resumeText)) atsScore += 10;
    if (/education/i.test(resumeText)) atsScore += 10;
    if (/skills?/i.test(resumeText)) atsScore += 5;

    // Links
    if (/github/i.test(resumeText)) atsScore += 5;
    if (/linkedin/i.test(resumeText)) atsScore += 5;

    // Resume Length
    if (resumeText.length > 1500) atsScore += 5;

    // Penalties
    if (detectedSkills.length < 4) atsScore -= 15;
    if (!/projects?/i.test(resumeText)) atsScore -= 5;
    if (!/experience/i.test(resumeText)) atsScore -= 5;

    atsScore = Math.round(atsScore);

    if (atsScore > 92) atsScore = 92;
    if (atsScore < 25) atsScore = 25;

    // ==========================
    // Suggestions
    // ==========================

    const suggestions = [];

    if (!/github/i.test(resumeText)) {
      suggestions.push("Add GitHub profile link");
    }

    if (!/linkedin/i.test(resumeText)) {
      suggestions.push("Add LinkedIn profile link");
    }

    if (missingSkills.includes("Docker")) {
      suggestions.push("Add Docker skills if applicable");
    }

    if (missingSkills.includes("AWS")) {
      suggestions.push("Add Cloud/AWS experience");
    }

    if (missingSkills.includes("TypeScript")) {
      suggestions.push("Learn and mention TypeScript");
    }

    if (!/experience/i.test(resumeText)) {
      suggestions.push("Add experience section");
    }

    if (!/projects?/i.test(resumeText)) {
      suggestions.push("Add project details");
    }

    const summary =
      aiAnalysis && aiAnalysis.length > 0
        ? aiAnalysis.substring(0, 250)
        : "Resume analyzed successfully.";

    const savedResume = await Resume.create({
      atsScore,
      summary,
      skills: detectedSkills,
      missingSkills: missingSkills.slice(0, 8),
      suggestions,
      resumeText,
    });

    res.json({
      success: true,
      atsScore,
      summary,
      skills: detectedSkills,
      missingSkills: missingSkills.slice(0, 8),
      suggestions,
      aiAnalysis,
      text: resumeText,
      resumeId: savedResume._id,
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await Resume.find().sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;