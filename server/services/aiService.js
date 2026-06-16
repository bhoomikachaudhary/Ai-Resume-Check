const analyzeResumeWithAI = async (resumeText) => {
    try {
      let strengths = [];
      let weaknesses = [];
      let roles = [];
  
      if (resumeText.toLowerCase().includes("java")) {
        strengths.push("Strong Java Development Skills");
        roles.push("Java Developer");
      }
  
      if (resumeText.toLowerCase().includes("react")) {
        strengths.push("Frontend Development Experience");
        roles.push("Frontend Developer");
      }
  
      if (resumeText.toLowerCase().includes("spring")) {
        strengths.push("Backend Development with Spring Boot");
        roles.push("Backend Developer");
      }
  
      if (!resumeText.toLowerCase().includes("docker")) {
        weaknesses.push("Docker not mentioned");
      }
  
      if (!resumeText.toLowerCase().includes("aws")) {
        weaknesses.push("Cloud skills not mentioned");
      }
  
      return `
  PROFESSIONAL SUMMARY
  
  Software Developer with experience in Java, Python, React, Spring Boot and Full Stack Development.
  
  TOP STRENGTHS
  
  ${strengths.join("\n")}
  
  TOP WEAKNESSES
  
  ${weaknesses.join("\n")}
  
  RECOMMENDED ROLES
  
  ${roles.join("\n")}
  
  IMPROVEMENT SUGGESTIONS
  
  • Add measurable achievements
  • Add GitHub profile
  • Add cloud technologies
  • Add Docker projects
  • Add deployment experience
  `;
    } catch (error) {
      console.error(error);
  
      return "AI Analysis unavailable";
    }
  };
  
  module.exports = analyzeResumeWithAI;