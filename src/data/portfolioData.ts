import { ProjectCaseStudy, RecruiterRoleEvaluation, SkillCategory } from '../types/portfolio';

export const portfolioProjects: ProjectCaseStudy[] = [
  {
    id: 'voltrix-ev',
    title: 'Voltrix — Real-Time EV Fleet Monitoring System',
    category: 'analytics',
    categoryLabel: 'EV Fleet Telemetry // ML & SQL',
    categoryAccent: 'cyan',
    description:
      'Engineered an intelligent battery health tracking platform. Deployed predictive degradation algorithms and real-time anomaly detection to alert fleet managers before battery degradation triggers costly down-time.',
    frontMetric1: { value: '-15%', label: 'Processing Latency Reduced' },
    frontMetric2: { value: '99.4%', label: 'Anomaly Detection Accuracy' },
    tags: ['Python', 'Machine Learning', 'Power BI', 'SQL'],
    underTheHood: {
      filename: 'voltrix_degradation_pipeline.py',
      language: 'python',
      code: `# Voltrix Real-time Battery Degradation Forecast
import numpy as np
import pandas as pd
from scipy.optimize import curve_fit

def arrhenius_degradation_model(cycles, temp_k, alpha=0.0015, ea=0.32):
    R = 8.314 # J/(mol*K)
    thermal_stress = np.exp(-ea / (R * temp_k * 1e-3))
    return 100.0 - (alpha * np.sqrt(cycles) * thermal_stress * 100)

def detect_cell_anomalies(telemetry_stream, threshold_z=2.58):
    rolling_mean = telemetry_stream['cell_v'].rolling(window=30).mean()
    rolling_std = telemetry_stream['cell_v'].rolling(window=30).std()
    z_scores = (telemetry_stream['cell_v'] - rolling_mean) / rolling_std
    return telemetry_stream[np.abs(z_scores) > threshold_z]`,
      impactSummary: 'Vectorized NumPy algorithms and partitioned SQL queries cut data ingestion latency by 15%.'
    }
  },
  {
    id: 'pir-noise-suppression',
    title: 'PIR Motion Signal Filter & False Alarm Suppressor',
    category: 'iot',
    categoryLabel: 'IoT & Embedded Systems // C & DSP',
    categoryAccent: 'amber',
    description:
      'Integrated PIR hardware sensors with custom digital signal-filtering algorithms in C. Eliminated environmental noise and thermal drift while reliably classifying authentic human motion triggers.',
    frontMetric1: { value: '84%', label: 'False Alarms Eliminated' },
    frontMetric2: { value: '< 4ms', label: 'Filter Latency Benchmark' },
    tags: ['C Programming', 'PIR Sensors', 'Digital Filtering', 'Python'],
    underTheHood: {
      filename: 'pir_iir_filter.c',
      language: 'c',
      code: `// Low-Power IIR Filtering for PIR Noise Suppression
#include <stdint.h>
#include <stdbool.h>

#define ALPHA_FIXED 13 // 0.20 weight in fixed point
static int32_t prev_filtered = 0;
static int32_t baseline_noise = 512;

bool process_pir_sample(int32_t raw_adc) {
    int32_t filtered = ((ALPHA_FIXED * raw_adc) + ((64 - ALPHA_FIXED) * prev_filtered)) >> 6;
    prev_filtered = filtered;

    int32_t diff = filtered - baseline_noise;
    if (diff < 0) diff = -diff;

    return (diff > 95); // Differentiate true human motion
}`,
      impactSummary: 'Zero dynamic heap allocation; compiled executable size under 1.8 KB.'
    }
  },
  {
    id: 'food-delivery-ux',
    title: 'Food Delivery Experience & Design System',
    category: 'uiux',
    categoryLabel: 'Product Design // UI/UX & Motion',
    categoryAccent: 'magenta',
    description:
      'Conducted end-to-end qualitative user research across restaurant discovery, cart management, and GPS delivery tracking. Designed an intuitive mobile design system with fluid micro-interactions.',
    frontMetric1: { value: '-35%', label: 'Checkout Drop-Off' },
    frontMetric2: { value: '4.8 / 5', label: 'Usability Test Score' },
    tags: ['Figma', 'Wireframing', 'Design Systems', 'Motion Design'],
    underTheHood: {
      filename: 'ux_design_tokens.json',
      language: 'json',
      code: `{
  "system": "FoodDelivery-Core-v2",
  "tokens": {
    "spacing": { "xs": 4, "sm": 8, "md": 16, "lg": 24, "xl": 32 },
    "motion": {
      "tapBounce": { "scale": 0.96, "stiffness": 500, "damping": 30 },
      "drawerSlide": { "duration": 320, "curve": [0.16, 1, 0.3, 1] }
    },
    "heuristicCompliance": {
      "visibilityOfSystemStatus": "Live courier tracking ping every 3s",
      "errorPrevention": "Immediate address geofence validation"
    }
  }
}`,
      impactSummary: 'Evaluated 24 participants across think-aloud usability testing at Tech Vedhu.'
    }
  },
  {
    id: 'quantum-ai-quizoff',
    title: 'Quantum Applications & National AI Competition',
    category: 'ai',
    categoryLabel: 'Research & Competitions // AI & Quantum',
    categoryAccent: 'violet',
    description:
      'Presented research paper on "Quantum Computing Applications Beyond Cryptography" at TCET Mumbai. Recognized as National Runner-Up in the Quizoff 2026 AI Competition.',
    frontMetric1: { value: 'Runner-Up', label: 'National AI Competition' },
    frontMetric2: { value: 'TCET', label: 'Mumbai Research Presentation' },
    tags: ['Artificial Intelligence', 'Quantum Systems', 'Data Science'],
    underTheHood: {
      filename: 'quantum_qaoa_simulation.py',
      language: 'python',
      code: `# Quantum Approximate Optimization Algorithm (QAOA)
import numpy as np

def construct_hamiltonian(graph_adjacency):
    n_qubits = len(graph_adjacency)
    cost_h = np.zeros((2**n_qubits, 2**n_qubits))
    for i in range(n_qubits):
        for j in range(i+1, n_qubits):
            if graph_adjacency[i][j] > 0:
                cost_h += generate_sigma_z_tensor(i, j, n_qubits)
    return cost_h`,
      impactSummary: 'Demonstrated algorithmic speedups for fleet vehicle routing and electrical grid optimization.'
    }
  }
];

export const toolchainData: SkillCategory[] = [
  {
    title: 'Data Engineering & Core Systems',
    colorClass: 'text-cyan',
    tools: ['Python 3.x', 'C Programming', 'SQL (PostgreSQL/MySQL)', 'DBMS & Normalization', 'ETL Pipelines', 'Web Scraping']
  },
  {
    title: 'Analytics & Visual Intelligence',
    colorClass: 'text-amber',
    tools: ['Power BI & DAX', 'NumPy', 'Pandas', 'SciPy & Optimization', 'Matplotlib / Seaborn', 'Interactive BI Dashboards']
  },
  {
    title: 'UI/UX & Product Architecture',
    colorClass: 'text-magenta',
    tools: ['Figma Prototyping', 'Wireframing', 'Design Systems', 'User Research & Journey', 'Usability Testing', 'Responsive Web & Mobile']
  },
  {
    title: 'Motion & Interaction Engineering',
    colorClass: 'text-violet',
    tools: ['Framer Motion', 'Micro-interactions', 'Canvas 2D / WebGL', 'Physics-Based Springs', 'Keyframe Choreography', 'Data Storytelling']
  }
];

export const recruiterProfiles: Record<string, RecruiterRoleEvaluation> = {
  hybrid: {
    id: 'hybrid',
    roleName: 'Hybrid Creative Technologist',
    fitScore: 98,
    title: 'Optimal Hybrid Creative Technologist Match',
    strengths: [
      'Bridges low-level code (C, SQL) with high-fidelity design systems and user-centric storytelling.',
      'Proven 15% latency reduction on real-world industrial predictive pipelines (Tech Volt).',
      'User-tested UI/UX prototypes at Tech Vedhu with quantified drop-off elimination.',
      'Top 10% class rank with 8.2 CGPA at Gnanamani College of Technology.'
    ],
    interviewQuestions: [
      '1. "How do your signal-filtering algorithms in C influence your approach to UI micro-interactions?"',
      '2. "Can you walk through your data preprocessing pipeline for the Voltrix EV monitoring system?"'
    ]
  },
  data: {
    id: 'data',
    roleName: 'Data & AI Engineer',
    fitScore: 95,
    title: 'Strong Data Analytics & AI Engineering Pedigree',
    strengths: [
      'High proficiency in Python (NumPy, Pandas, SciPy, Matplotlib), SQL, and Power BI.',
      'National AI Competition Runner-Up at Quizoff 2026.',
      'Presented research on Quantum Computing Applications at TCET Mumbai.',
      'Completed Google/Coursera Data Science & Applied Data Science Specializations.'
    ],
    interviewQuestions: [
      '1. "What thresholding techniques did you employ to eliminate environmental noise in PIR sensor streams?"',
      '2. "How would you structure a real-time anomaly detection pipeline for streaming IoT data?"'
    ]
  },
  design: {
    id: 'design',
    roleName: 'UI/UX & Motion Architect',
    fitScore: 94,
    title: 'High-Impact UI/UX & Motion Architecture Match',
    strengths: [
      'Conducted complete qualitative user research across restaurant discovery, cart, and delivery tracking.',
      'Formulated scalable Figma design tokens and component systems during Tech Vedhu internship.',
      'Deep mastery of 60 FPS physics-based animation curves, spring dynamics, and Framer Motion patterns.',
      'Employs quantitative data telemetry to validate design decisions and lower drop-off rates.'
    ],
    interviewQuestions: [
      '1. "How did you conduct user research to streamline the food delivery customer experience?"',
      '2. "What are your core principles for creating micro-interactions that enhance rather than distract UX?"'
    ]
  }
};
