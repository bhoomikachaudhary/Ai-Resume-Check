function Navbar() {
    return (
      <div className="sticky top-4 z-50 mb-8">
        <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center">
  
          <h1 className="font-black text-2xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ResumeAI
          </h1>
  
          <div className="flex gap-6 text-slate-300">
            <button>Dashboard</button>
            <button>History</button>
            <button>Profile</button>
          </div>
  
        </div>
      </div>
    );
  }
  
  export default Navbar;