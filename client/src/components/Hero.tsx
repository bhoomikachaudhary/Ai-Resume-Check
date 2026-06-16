function Hero() {
    return (
      <section className="relative overflow-hidden rounded-[40px] mb-12">
  
        {/* Background Glow */}
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-cyan-500/20 blur-[180px] rounded-full" />
  
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[180px] rounded-full" />
  
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10" />
  
        <div
          className="
          relative z-10
          py-24
          px-10
          text-center
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          rounded-[40px]
        "
        >
  
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-5
            py-2
            rounded-full
            border
            border-cyan-500/30
            bg-cyan-500/10
            text-cyan-300
            text-sm
            font-medium
            mb-8
          "
          >
            🚀 AI Powered Resume Intelligence
          </div>
  
          <h1
            className="
            text-6xl
            md:text-8xl
            font-black
            leading-tight
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
            "
          >
            AI Resume
            <br />
            Analyzer
          </h1>
  
          <p
            className="
            mt-8
            text-xl
            text-slate-300
            max-w-4xl
            mx-auto
            leading-relaxed
          "
          >
            Upload your resume and receive ATS scoring,
            AI-driven insights, skill-gap detection,
            recruiter-focused recommendations and
            personalized career improvement suggestions.
          </p>
  
          <div className="flex justify-center gap-4 flex-wrap mt-10">
  
            <span className="px-5 py-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              ⚡ ATS Optimization
            </span>
  
            <span className="px-5 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
              🤖 AI Analysis
            </span>
  
            <span className="px-5 py-3 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
              🎯 Skill Gap Detection
            </span>
  
            <span className="px-5 py-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
              📈 Career Growth
            </span>
  
          </div>
  
          {/* Stats */}
  
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
  
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="text-4xl font-black text-cyan-400">
                95%
              </h3>
              <p className="text-slate-400 mt-2">
                ATS Accuracy
              </p>
            </div>
  
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="text-4xl font-black text-purple-400">
                AI
              </h3>
              <p className="text-slate-400 mt-2">
                Resume Insights
              </p>
            </div>
  
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="text-4xl font-black text-green-400">
                100+
              </h3>
              <p className="text-slate-400 mt-2">
                Skill Checks
              </p>
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Hero;