import { useState } from "react";
import axios from "axios";

import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import ATSCard from "./components/ATSCard";
import SkillsCard from "./components/SkillsCard";
import AnalysisCard from "./components/AnalysisCard";
import HistoryCard from "./components/HistoryCard";

interface HistoryItem {
  _id: string;
  atsScore: number;
  summary: string;
  createdAt: string;
}

/* ─────────────────────────────────────────────────────────────
   Tiny reusable primitives
───────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3 select-none">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "red" | "violet" | "amber";
}) {
  const glowMap: Record<string, string> = {
    cyan: "hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.25)]",
    red: "hover:shadow-[0_0_40px_-8px_rgba(248,113,113,0.25)]",
    violet: "hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.25)]",
    amber: "hover:shadow-[0_0_40px_-8px_rgba(251,191,36,0.25)]",
  };
  return (
    <div
      className={`
        relative bg-[#0d1117] border border-white/[0.07] rounded-2xl
        transition-all duration-300
        ${glow ? glowMap[glow] : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stat card (ATS score / skills count / missing count)
───────────────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  sub,
  color,
  glow,
}: {
  label: string;
  value: number | string;
  sub: string;
  color: string;
  glow: "cyan" | "red" | "violet" | "amber";
}) {
  return (
    <Card glow={glow} className="p-7 flex flex-col gap-1">
      <SectionLabel>{label}</SectionLabel>
      <div className={`text-5xl font-black tabular-nums leading-none ${color}`}>
        {value}
      </div>
      <p className="text-sm text-slate-500 mt-2">{sub}</p>
      {/* subtle bottom accent line */}
      <div
        className={`
          absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-40
          ${
            glow === "cyan"
              ? "bg-cyan-400"
              : glow === "red"
              ? "bg-red-400"
              : glow === "violet"
              ? "bg-violet-400"
              : "bg-amber-400"
          }
        `}
      />
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main App
───────────────────────────────────────────────────────────── */

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasResults = atsScore > 0 || skills.length > 0 || summary;

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post(
        "https://ai-resume-builder-hmxo.onrender.com/api/resume/upload",
        formData
      );
      setResumeText(res.data.text || "");
      setSkills(res.data.skills || []);
      setMissingSkills(res.data.missingSkills || []);
      setSummary(res.data.summary || "");
      setAtsScore(res.data.atsScore || 0);
      setSuggestions(res.data.suggestions || []);
      setAiAnalysis(res.data.aiAnalysis || "");
    } catch (error) {
      console.error(error);
      alert("Analysis failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "https://ai-resume-builder-hmxo.onrender.com/api/resume/history"
      );
      setHistory(res.data || []);
      setShowHistory(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load history.");
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.07) 0%, transparent 60%), #080c10",
      }}
    >
      {/* ── subtle grid overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-10 space-y-10">

        {/* ── Hero ── */}
        <Hero />

        {/* ── Upload ── */}
        <div className="max-w-3xl mx-auto">
          <UploadCard
            onFileChange={setFile}
            onAnalyze={uploadResume}
            onHistory={fetchHistory}
            loading={loading}
            selectedFileName={file?.name}
          />
        </div>

        {/* ── Results (shown only after analysis) ── */}
        {hasResults && (
          <div
            className="space-y-10 animate-[fadeIn_0.5s_ease_both]"
            style={
              { "--tw-animate-duration": "0.5s" } as React.CSSProperties
            }
          >
            {/* ── Stats row ── */}
            <div className="grid sm:grid-cols-3 gap-5">
              <StatCard
                label="ATS Score"
                value={`${atsScore}%`}
                sub="Applicant tracking compatibility"
                color="text-cyan-400"
                glow="cyan"
              />
              <StatCard
                label="Detected Skills"
                value={skills.length}
                sub="Keywords matched in your resume"
                color="text-emerald-400"
                glow="cyan"
              />
              <StatCard
                label="Missing Skills"
                value={missingSkills.length}
                sub="Gaps to address before applying"
                color="text-red-400"
                glow="red"
              />
            </div>

            {/* ── Summary ── */}
            {summary && (
              <Card className="p-8">
                <SectionLabel>Professional Summary</SectionLabel>
                <p className="text-slate-300 leading-8 text-base">{summary}</p>
              </Card>
            )}

            {/* ── AI Analysis ── */}
            <AnalysisCard aiAnalysis={aiAnalysis} />

            {/* ── Skills grid ── */}
            <div className="grid md:grid-cols-2 gap-5">
              <SkillsCard
                title="Detected Skills"
                skills={skills}
                positive={true}
              />
              <SkillsCard
                title="Missing Skills"
                skills={missingSkills}
                positive={false}
              />
            </div>

            {/* ── Suggestions ── */}
            {suggestions.length > 0 && (
              <div>
                <SectionLabel>AI Suggestions</SectionLabel>
                <div className="space-y-3">
                  {suggestions.map((item, index) => (
                    <Card
                      key={index}
                      glow="amber"
                      className="p-5 flex gap-4 items-start group"
                    >
                      {/* index number */}
                      <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-[11px] font-bold text-amber-400">
                        {index + 1}
                      </span>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ── History ── */}
            {showHistory && <HistoryCard history={history} />}

            {/* ── Raw text ── */}
            {resumeText && (
              <div>
                <SectionLabel>Extracted Resume Text</SectionLabel>
                <Card className="p-6">
                  <div className="h-80 overflow-y-auto rounded-xl bg-[#060a0e] border border-white/[0.05] p-5 text-sm text-slate-400 font-mono whitespace-pre-wrap leading-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    {resumeText}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ── Empty state ── */}
        {!hasResults && !loading && (
          <p className="text-center text-slate-600 text-sm pt-8">
            Upload your resume above to see your ATS score, skill gaps, and
            personalised suggestions.
          </p>
        )}
      </div>

      {/* ── Fade-in keyframe injected inline ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-\\[fadeIn_0\\.5s_ease_both\\] {
          animation: fadeIn 0.5s ease both;
        }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-track-transparent { scrollbar-color: rgba(255,255,255,0.08) transparent; }
      `}</style>
    </div>
  );
}

export default App;
