import React, { useState } from 'react';
import { recruiterProfiles } from '../data/portfolioData';

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterModal: React.FC<RecruiterModalProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<'hybrid' | 'data' | 'design'>('hybrid');

  if (!isOpen) return null;

  const currentProfile = recruiterProfiles[selectedRole];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-500">
            // Automated Talent Evaluation
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">HR Candidate Assessment Copilot</h2>
          <p className="text-sm text-slate-400 mt-1">
            Benchmarking <strong>C. Sandeepraj</strong> against industrial requirements for hybrid data and design roles.
          </p>
        </div>

        <div className="mb-6">
          <div className="text-xs font-mono uppercase text-slate-500 mb-2">Select Benchmark Position:</div>
          <div className="flex flex-wrap gap-2">
            {(['hybrid', 'data', 'design'] as const).map((roleKey) => (
              <button
                key={roleKey}
                onClick={() => setSelectedRole(roleKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                  selectedRole === roleKey
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                }`}
              >
                {recruiterProfiles[roleKey].roleName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-4 rounded-xl bg-black/40 border border-white/10 items-center mb-6">
          <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 rounded-full w-28 h-28 mx-auto border-4 border-cyan-400 shadow-lg shadow-cyan-500/20">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">
              {currentProfile.fitScore}%
            </span>
            <span className="text-[10px] font-mono uppercase text-slate-400">Role Fit</span>
          </div>

          <div className="sm:col-span-8">
            <h3 className="text-base font-bold text-white mb-2">{currentProfile.title}</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              {currentProfile.strengths.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/30 border border-white/10 mb-6">
          <h4 className="text-xs font-mono text-cyan-400 mb-2">
            Recommended Technical Interview Questions:
          </h4>
          <div className="text-xs text-slate-300 space-y-1">
            {currentProfile.interviewQuestions.map((q, idx) => (
              <p key={idx}>{q}</p>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <a
            href="mailto:ssandeepraj894@gmail.com?subject=Interview%20Invitation"
            className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold text-xs hover:shadow-lg hover:shadow-cyan-500/20 transition"
          >
            Schedule Direct Interview
          </a>
        </div>
      </div>
    </div>
  );
};
