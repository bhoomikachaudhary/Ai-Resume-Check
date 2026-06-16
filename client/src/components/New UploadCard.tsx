interface UploadCardProps {
    onFileChange: (file: File | null) => void;
    onAnalyze: () => void;
    onHistory: () => void;
  }
  
  function UploadCard({
    onFileChange,
    onAnalyze,
    onHistory,
  }: UploadCardProps) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 mb-8 text-center">
  
        <h2 className="text-2xl font-bold mb-3">
          Upload Resume
        </h2>
  
        <p className="text-slate-400 mb-6">
          PDF format only
        </p>
  
        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            onFileChange(
              e.target.files ? e.target.files[0] : null
            )
          }
          className="mb-6"
        />
  
        <div className="flex justify-center gap-4">
  
          <button
            onClick={onAnalyze}
            className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold"
          >
            Analyze Resume
          </button>
  
          <button
            onClick={onHistory}
            className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
          >
            View History
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default UploadCard;