const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    atsScore: {
      type: Number,
      default: 0
    },

    summary: {
      type: String,
      default: ""
    },

    skills: [String],

    missingSkills: [String],

    suggestions: [String],

    resumeText: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);