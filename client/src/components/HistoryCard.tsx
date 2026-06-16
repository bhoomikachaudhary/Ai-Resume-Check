interface HistoryItem {
    _id: string;
    atsScore: number;
    summary: string;
    createdAt: string;
  }
  
  interface HistoryCardProps {
    history?: HistoryItem[];
  }
  
  function HistoryCard({
    history = [],
  }: HistoryCardProps) {
    if (history.length === 0) {
      return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            📜 Analysis History
          </h2>
  
          <p className="text-slate-400">
            No history found
          </p>
        </div>
      );
    }
  
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          📜 Analysis History
        </h2>
  
        <div className="grid md:grid-cols-2 gap-4">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-4"
            >
              <div className="flex justify-between mb-3">
                <span className="text-green-400 font-bold">
                  ATS: {item.atsScore}%
                </span>
  
                <span className="text-slate-400 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
  
              <p className="text-slate-300">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default HistoryCard;