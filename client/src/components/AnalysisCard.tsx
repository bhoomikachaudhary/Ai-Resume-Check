interface AnalysisCardProps {
    aiAnalysis: string;
  }
  
  function AnalysisCard({ aiAnalysis }: AnalysisCardProps) {
    if (!aiAnalysis) return null;
  
    return (
      <div
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          mb-8
          shadow-xl
        "
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          🤖 AI Resume Analysis
        </h2>
  
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
          <pre className="whitespace-pre-wrap text-slate-300 leading-7 font-sans">
            {aiAnalysis}
          </pre>
        </div>
      </div>
    );
  }
  
  export default AnalysisCard;