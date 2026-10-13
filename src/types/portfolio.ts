// C. Sandeepraj - Portfolio TypeScript Type Definitions

export type RoleTheme = 'data' | 'uiux' | 'motion';

export interface MetricItem {
  value: string;
  label: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'analytics' | 'uiux' | 'iot' | 'ai';
  categoryLabel: string;
  categoryAccent: 'cyan' | 'magenta' | 'amber' | 'violet';
  description: string;
  frontMetric1: { value: string; label: string };
  frontMetric2: { value: string; label: string };
  tags: string[];
  underTheHood: {
    filename: string;
    language: 'python' | 'sql' | 'c' | 'json';
    code: string;
    impactSummary: string;
  };
}

export interface PipelineStage {
  id: string;
  number: string;
  title: string;
  tech: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  colorClass: string;
  tools: string[];
}

export interface RecruiterRoleEvaluation {
  id: string;
  roleName: string;
  fitScore: number;
  title: string;
  strengths: string[];
  interviewQuestions: string[];
}
