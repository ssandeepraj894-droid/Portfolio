import React, { useState } from 'react';
import { ProjectCaseStudy } from '../types/portfolio';

interface ProjectFlipCardProps {
  project: ProjectCaseStudy;
}

export const ProjectFlipCard: React.FC<ProjectFlipCardProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner">
        {/* FRONT FACE */}
        <div className="card-face card-front">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs font-mono font-bold uppercase text-${project.categoryAccent}`}>
                {project.categoryLabel}
              </span>
              <button
                onClick={() => setIsFlipped(true)}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition"
              >
                <span>Under the Hood</span>
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>
          </div>

          <div className="w-full h-44 rounded-lg bg-slate-950 border border-white/10 p-4 flex flex-col justify-between mb-4">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-cyan-400">Live Telemetry Feed</span>
              <span className="text-emerald-400">● Operational</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white">
              {project.frontMetric1.value}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {project.frontMetric1.label}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div>
                <div className="text-lg font-mono font-bold text-cyan-400">{project.frontMetric1.value}</div>
                <div className="text-xs text-slate-500">{project.frontMetric1.label}</div>
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-emerald-400">{project.frontMetric2.value}</div>
                <div className="text-xs text-slate-500">{project.frontMetric2.label}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BACK FACE (UNDER THE HOOD) */}
        <div className="card-face card-back">
          <div>
            <div className="flex justify-between items-center pb-2 mb-3 border-b border-white/10">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                {project.underTheHood.filename}
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="px-3 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 transition"
              >
                Back to Preview
              </button>
            </div>

            <div className="bg-[#04070d] p-3 rounded-lg border border-white/10 font-mono text-xs text-slate-200 overflow-y-auto max-h-64">
              <pre>
                <code>{project.underTheHood.code}</code>
              </pre>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 text-xs font-mono text-slate-400">
            <span className="text-cyan-400 font-bold">Optimization: </span>
            {project.underTheHood.impactSummary}
          </div>
        </div>
      </div>
    </div>
  );
};
