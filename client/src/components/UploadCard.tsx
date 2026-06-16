import { Upload, History } from "lucide-react";

interface UploadCardProps {
  onFileChange: (file: File | null) => void;
  onAnalyze: () => void;
  onHistory: () => void;
  loading: boolean;
  selectedFileName?: string;
}

function UploadCard({
  onFileChange,
  onAnalyze,
  onHistory,
  loading,
  selectedFileName,
}: UploadCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 mb-10 shadow-2xl">

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10">

        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-cyan-500/20 border border-cyan-500/30">
            <Upload size={40} className="text-cyan-400" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-center mb-3">
          Upload Resume
        </h2>

        <p className="text-slate-400 text-center mb-8">
          ATS Score • AI Analysis • Skill Gap Detection
        </p>

        <div className="border-2 border-dashed border-cyan-500/30 rounded-3xl p-10 text-center bg-slate-900/40">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              onFileChange(e.target.files?.[0] || null);
            }}
            className="mb-4"
          />

          {selectedFileName && (
            <div className="mt-4 text-green-400 font-semibold">
              📄 {selectedFileName}
            </div>
          )}

        </div>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">

          <button
            onClick={onAnalyze}
            disabled={loading}
            className="
            px-8 py-4
            rounded-2xl
            font-bold
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:scale-105
            hover:shadow-xl
            hover:shadow-cyan-500/30
            transition-all
            disabled:opacity-50
            "
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          <button
            onClick={onHistory}
            className="
            px-8 py-4
            rounded-2xl
            font-bold
            bg-gradient-to-r
            from-green-500
            to-emerald-600
            hover:scale-105
            transition-all
            flex items-center gap-2
            "
          >
            <History size={18} />
            History
          </button>

        </div>

      </div>
    </div>
  );
}

export default UploadCard;