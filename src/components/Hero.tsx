import React from 'react';
import { RoleTheme } from '../types/portfolio';

interface HeroProps {
  activeRole: RoleTheme;
  onRoleChange: (role: RoleTheme) => void;
  onOpenRecruiter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ activeRole, onRoleChange, onOpenRecruiter }) => {
  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 mb-6 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available for Hybrid Creative Technologist & Data Roles</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-500">Visual Experience</span> Meets Quantitative Insight.
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            I am a hybrid engineer and designer synthesizing <strong>Data Analytics, Machine Learning (Python &amp; SQL)</strong> with high-fidelity <strong>UI/UX Prototyping and Motion Graphics</strong>.
          </p>

          {/* Dynamic Role Switcher */}
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
              Active Perspective:
            </div>
            <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 gap-1">
              <button
                onClick={() => onRoleChange('data')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeRole === 'data' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Data Analytics &amp; SQL
              </button>
              <button
                onClick={() => onRoleChange('uiux')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeRole === 'uiux' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                UI/UX Design
              </button>
              <button
                onClick={() => onRoleChange('motion')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition ${
                  activeRole === 'motion' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                Motion &amp; Creative
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#pipeline"
              className="px-5 py-3 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/30 transition"
            >
              Explore Architecture
            </a>
            <button
              onClick={onOpenRecruiter}
              className="px-5 py-3 rounded-lg bg-rose-500/10 border border-rose-500/40 text-rose-400 font-mono font-bold text-sm hover:bg-rose-500/20 transition"
            >
              HR Recruiter Mode
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">8.2 / 10</div>
              <div className="text-xs text-slate-500 uppercase mt-1">B.Tech CGPA</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">-15%</div>
              <div className="text-xs text-slate-500 uppercase mt-1">Latency Reduced</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-rose-400">Runner-Up</div>
              <div className="text-xs text-slate-500 uppercase mt-1">National AI Quiz</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-purple-400">98%</div>
              <div className="text-xs text-slate-500 uppercase mt-1">HR Fit Score</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl p-3 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900">
              <img
                src="/profile.png"
                alt="C. Sandeepraj"
                className="w-full h-full object-cover object-top filter contrast-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
