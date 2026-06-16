interface SkillsCardProps {
    title: string;
    skills?: string[];
    positive: boolean;
  }
  
  function SkillsCard({
    title,
    skills = [],
    positive,
  }: SkillsCardProps) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
  
        <h2
          className={`text-2xl font-bold mb-6 ${
            positive ? "text-cyan-400" : "text-red-400"
          }`}
        >
          {positive ? "🚀" : "⚠️"} {title}
        </h2>
  
        {skills.length === 0 ? (
          <div className="text-slate-400 text-center py-8">
            No skills detected
          </div>
        ) : (
          <div className="space-y-4">
  
            {skills.map((skill, index) => {
              const percentage = positive
                ? 80 + (index % 20)
                : 30 + (index % 30);
  
              return (
                <div key={index}>
  
                  <div className="flex justify-between mb-2">
                    <span>{skill}</span>
                    <span>{percentage}%</span>
                  </div>
  
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
  
                    <div
                      className={`h-3 rounded-full ${
                        positive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                          : "bg-gradient-to-r from-red-500 to-orange-500"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
  
                  </div>
  
                </div>
              );
            })}
  
          </div>
        )}
  
      </div>
    );
  }
  
  export default SkillsCard;