import {
    CircularProgressbar,
    buildStyles,
  } from "react-circular-progressbar";
  
  import "react-circular-progressbar/dist/styles.css";
  
  interface ATSCardProps {
    score: number;
  }
  
  function ATSCard({ score }: ATSCardProps) {
    const status =
      score >= 80
        ? "Excellent"
        : score >= 60
        ? "Good"
        : "Needs Improvement";
  
    return (
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
  
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/20 blur-[100px] rounded-full" />
  
        <div className="relative z-10">
  
          <h2 className="text-2xl font-bold text-cyan-400 mb-8">
            ATS Score
          </h2>
  
          <div className="w-52 h-52 mx-auto">
  
            <CircularProgressbar
              value={score}
              text={`${score}%`}
              styles={buildStyles({
                pathColor:
                  score >= 80
                    ? "#22c55e"
                    : score >= 60
                    ? "#facc15"
                    : "#ef4444",
  
                textColor: "#fff",
                trailColor: "#0f172a",
                textSize: "16px",
              })}
            />
  
          </div>
  
          <div className="text-center mt-6">
  
            <div className="text-3xl font-black">
              {score}%
            </div>
  
            <div className="text-slate-400 mt-2">
              Resume Compatibility
            </div>
  
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {status}
            </div>
  
          </div>
  
        </div>
      </div>
    );
  }
  
  export default ATSCard;