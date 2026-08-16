import type { LucideIcon } from 'lucide-react'
import {
  Satellite,
  Atom,
  Cpu,
  Bot,
  ShieldCheck,
  Glasses,
  BrainCircuit,
  Leaf,
  Briefcase,
} from 'lucide-react'

export const EVENT = {
  name: 'Codefiesta 2026',
  host: 'GIT Jaipur',
  hostFull: 'Global Institute of Technology, Jaipur',
  tagline: 'Build what comes next.',
  dates: 'Oct 11 – 12, 2026',
  location: 'GIT Campus, Jaipur, Rajasthan',
  collegeUrl: 'https://gitjaipur.com',
}

export type FocusArea = {
  id: string
  index: string
  title: string
  blurb: string
  tags: string[]
  icon: LucideIcon
}

export const FOCUS_AREAS: FocusArea[] = [
  {
    id: 'communications',
    index: '01',
    title: 'Communications & Connectivity',
    blurb:
      'Next-gen networks spanning 5G / 6G, satellite navigation and resilient communication infrastructure.',
    tags: ['5G / 6G', 'Satellite Nav', 'Networking'],
    icon: Satellite,
  },
  {
    id: 'quantum',
    index: '02',
    title: 'Quantum Communication',
    blurb:
      'Quantum key distribution, entanglement-based security and the future of unbreakable communication.',
    tags: ['QKD', 'Entanglement', 'Cryptography'],
    icon: Atom,
  },
  {
    id: 'semiconductors',
    index: '03',
    title: 'Semiconductors & Electronics',
    blurb:
      'Chip design, embedded systems and the hardware backbone powering modern computation.',
    tags: ['VLSI', 'Embedded', 'PCB'],
    icon: Cpu,
  },
  {
    id: 'robotics',
    index: '04',
    title: 'Robotics & Autonomy',
    blurb:
      'Drones, humanoids and autonomous machines that sense, decide and act in the physical world.',
    tags: ['Drones', 'Humanoids', 'Control'],
    icon: Bot,
  },
  {
    id: 'cybersecurity',
    index: '05',
    title: 'Cybersecurity',
    blurb:
      'Threat intelligence, secure systems and defensive engineering for a connected world.',
    tags: ['AppSec', 'Threat Intel', 'Zero Trust'],
    icon: ShieldCheck,
  },
  {
    id: 'immersive',
    index: '06',
    title: 'IoT & Immersive Media',
    blurb:
      'IoT, wearables, AR / VR and immersive experiences that blend the digital and physical.',
    tags: ['IoT', 'Wearables', 'AR / VR'],
    icon: Glasses,
  },
  {
    id: 'ai',
    index: '07',
    title: 'AI, IT & Software',
    blurb:
      'Applied AI, software craft and human-computer interaction that reshapes how we work.',
    tags: ['AI / ML', 'HCI', 'Software'],
    icon: BrainCircuit,
  },
  {
    id: 'greentech',
    index: '08',
    title: 'GreenTech & Mobility',
    blurb:
      'Renewable energy, electric & autonomous vehicles and sustainable technology for the planet.',
    tags: ['Renewables', 'EV / AV', 'Sustainability'],
    icon: Leaf,
  },
]

export const SERVICES_TRACK: FocusArea = {
  id: 'services',
  index: '09',
  title: 'Services & Digital Economy',
  blurb:
    'FinTech, EdTech, HealthTech, E-Commerce and the platforms driving the digital economy.',
  tags: ['FinTech', 'EdTech', 'HealthTech'],
  icon: Briefcase,
}

export type Prize = {
  place: string
  amount: string
  label: string
  perks: string[]
  highlight?: boolean
}

export const PRIZES: Prize[] = [
  {
    place: '1st',
    amount: '₹30,000',
    label: 'Grand Champion',
    perks: ['Winner trophy', 'Gold medals', 'Certificate', 'Recruiter fast-track'],
    highlight: true,
  },
  {
    place: '2nd',
    amount: '₹20,000',
    label: 'Runner Up',
    perks: ['Silver medals', 'Certificate', 'Premium goodies'],
  },
  {
    place: '3rd',
    amount: '₹15,000',
    label: 'Second Runner Up',
    perks: ['Bronze medals', 'Certificate', 'Goodies'],
  },
]

export const SPECIAL_PRIZES: Prize[] = [
  {
    place: '★',
    amount: '₹8,000',
    label: 'Best Idea',
    perks: ['Innovation trophy', 'Certificate'],
  },
  {
    place: '★',
    amount: '₹6,000',
    label: 'Best Presentation',
    perks: ['Certificate', 'Goodies'],
  },
  {
    place: '★',
    amount: '₹5,000',
    label: 'Best Rookie Team',
    perks: ['Certificate', 'Goodies'],
  },
  
]

export type ScheduleItem = { time: string; title: string; detail: string }
export type ScheduleDay = { id: string; label: string; date: string; theme: string; items: ScheduleItem[] }

export const SCHEDULE: ScheduleDay[] = [
  {
    id: 'day1',
    label: 'Day 1',
    date: 'Oct 11',
    theme: 'Kickoff & Ideation',
    items: [
      { time: '08:30', title: 'Registration & Check-in', detail: 'Collect kits, badges and swag at the main atrium.' },
      { time: '10:00', title: 'Opening Ceremony', detail: 'Welcome address, keynote and track reveal.' },
      { time: '11:30', title: 'Team Formation', detail: 'Find teammates, finalize squads and pick a track.' },
      { time: '13:00', title: 'Lunch Break', detail: 'Networking lunch with mentors and sponsors.' },
      { time: '14:00', title: 'Hacking Begins', detail: '48-hour clock starts. Ideation & problem selection.' },
      { time: '19:00', title: 'Mentor Round 1', detail: 'One-on-one guidance from industry mentors.' },
      { time: '22:00', title: 'Midnight Snacks', detail: 'Refuel and keep the momentum going.' },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: 'Oct 12',
    theme: 'Build & Iterate',
    items: [
      { time: '09:00', title: 'Standup Sync', detail: 'Quick progress check-in with track leads.' },
      { time: '11:00', title: 'Tech Workshops', detail: 'Hands-on sessions on AI, cloud and hardware.' },
      { time: '13:00', title: 'Lunch Break', detail: 'Fuel up for the build sprint.' },
      { time: '15:00', title: 'Mentor Round 2', detail: 'Deep-dive reviews and architecture feedback.' },
      { time: '18:00', title: 'Mini-Games & Fun', detail: 'Break the grind with games and prizes.' },
      { time: '21:00', title: 'Dinner', detail: 'Community dinner and lightning talks.' },
      { time: '23:00', title: 'Night Build Sprint', detail: 'Push features and prepare for the final stretch.' },
    ],
  },
  {
    id: 'day3',
    label: 'Day 3',
    date: 'Oct 13',
    theme: 'Demo & Awards',
    items: [
      { time: '09:00', title: 'Code Freeze', detail: 'Final commits and submission deadline.' },
      { time: '10:00', title: 'Preliminary Judging', detail: 'Track-wise demos to the judging panel.' },
      { time: '12:30', title: 'Lunch Break', detail: 'Relax before the grand finale.' },
      { time: '14:00', title: 'Grand Finale Pitches', detail: 'Top teams pitch on the main stage.' },
      { time: '16:30', title: 'Award Ceremony', detail: 'Winners announced, prizes and medals awarded.' },
      { time: '18:00', title: 'Closing & Networking', detail: 'Celebrate, connect and wrap up Codefiesta.' },
    ],
  },
]

export type Person = {
  name: string
  role: string
  image: string
  bio: string
  linkedin?: string
}

export const ORGANIZERS: Person[] = [
  { name: 'Shri Naman Kandoi', role: 'Secratory & CEO-GITS', image: '/organizer-1.png', bio: 'CEO, Naman Kandoi (Mastered from Imperial College in London in innovation, entrepreneurship, and management) appears to drive the strategic leadership of the institute' },
  { name: 'Shri Rajkumar Kandoi', role: 'Chairman GITS', image: '/organizer-2.png', bio: 'A philanthropist, Samaritan of repute ….Shri Rajkumar Kandoi is the patriarch and head of the Kandoi Group/Society that founded and manages GIT College' },
  { name: 'Dr. I.C. Sharma', role: 'Principal-GIT', image: '/organizer-3.png', bio: 'Dr.I.C Sharma currently holds the position of Principal at the Global Institute of Technology' },
]

export const COORDINATORS: Person[] = [
  { name: 'Akash Kumar1', role: 'Student Lead', image: '/student-1.png', bio: '3rd-year CSE, orchestrating logistics and volunteers.' },
  { name: 'Akash Kumar2', role: 'Design & Media', image: '/student-2.png', bio: 'Runs branding, social and the on-ground experience.' },
  { name: 'Akash Kumar3', role: 'Sponsorship Lead', image: '/student-3.png', bio: 'Bridges industry partners with the hackathon community.' },
  { name: 'Akash Kumar4', role: 'Operations', image: '/student-4.png', bio: 'Keeps 48 hours of chaos running smoothly.' },
]

export const SPONSORS = [
  'NEXUS LABS',
  'QUBIT',
  'HELIX',
  'VOLTA',
  'ORBIT AI',
  'FORGE',
  'SENTINEL',
  'PIXELWORKS',
]

export type Highlight = { title: string; image: string; year: string }

export const HIGHLIGHTS: Highlight[] = [
  { title: 'Opening Keynote 2025', image: '/highlight-1.mp4', year: '2025' },
  { title: 'Overnight Build Sprint', image: '/highlight-2.mp4', year: '2025' },
  { title: 'Grand Finale Pitches', image: '/highlight-3.mp4', year: '2024' },
  { title: 'Award Ceremony', image: '/highlight-4.mp4', year: '2024' },
]

export type ProblemStatement = {
  id: string
  code: string
  track: string
  title: string
  summary: string
  description: string
  deliverables: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  { id: 'PS01', code: 'PS-01', track: 'AI / ML', title: 'Adaptive Learning Companion', summary: 'A personalized AI tutor that adapts to each student.', description: 'Build an AI tutor that assesses a learner’s strengths and gaps in real time and dynamically adjusts lesson difficulty, pacing and content format. It should support multiple subjects and provide explainable feedback to teachers.', deliverables: ['Adaptive assessment engine', 'Teacher analytics dashboard', 'Explainable recommendations'], difficulty: 'Advanced' },
  { id: 'PS02', code: 'PS-02', track: 'Cybersecurity', title: 'Phishing Sentinel', summary: 'Real-time detection of phishing across email and chat.', description: 'Design a system that flags phishing attempts across email and messaging using URL analysis, content heuristics and ML. It should minimize false positives and offer users a clear, actionable warning.', deliverables: ['Detection model', 'Browser / mail plugin', 'Risk scoring API'], difficulty: 'Intermediate' },
  { id: 'PS03', code: 'PS-03', track: 'GreenTech', title: 'Smart Grid Optimizer', summary: 'Balance renewable supply with dynamic demand.', description: 'Create a dashboard that forecasts renewable generation and household demand, then recommends load-shifting to maximize clean energy usage and reduce cost.', deliverables: ['Forecasting module', 'Load-shift recommender', 'Consumer dashboard'], difficulty: 'Advanced' },
  { id: 'PS04', code: 'PS-04', track: 'HealthTech', title: 'Rural Diagnostics Kit', summary: 'Offline-first triage for low-connectivity clinics.', description: 'Build an offline-first mobile app that guides community health workers through symptom triage and syncs securely when connectivity returns.', deliverables: ['Offline triage flow', 'Secure sync', 'Multilingual UI'], difficulty: 'Intermediate' },
  { id: 'PS05', code: 'PS-05', track: 'IoT', title: 'Campus Air Quality Mesh', summary: 'Low-cost sensor mesh mapping air quality.', description: 'Design a network of low-cost IoT sensors that maps air quality across a campus and surfaces anomalies with alerts and heatmaps.', deliverables: ['Sensor firmware', 'Ingestion pipeline', 'Live heatmap'], difficulty: 'Intermediate' },
  { id: 'PS06', code: 'PS-06', track: 'FinTech', title: 'Micro-Investment Nudge', summary: 'Round-up savings with behavioral nudges.', description: 'Create an app that rounds up everyday transactions into diversified micro-investments and uses behavioral nudges to build a saving habit.', deliverables: ['Round-up engine', 'Portfolio simulation', 'Nudge system'], difficulty: 'Beginner' },
  { id: 'PS07', code: 'PS-07', track: 'Robotics', title: 'Warehouse Path Planner', summary: 'Collision-free routing for delivery bots.', description: 'Implement a multi-agent path planner for warehouse robots that avoids collisions and optimizes throughput under changing order loads.', deliverables: ['Path-planning core', 'Simulation view', 'Throughput metrics'], difficulty: 'Advanced' },
  { id: 'PS08', code: 'PS-08', track: 'AR / VR', title: 'Immersive Lab Simulator', summary: 'Practice risky experiments safely in VR.', description: 'Build a VR module that lets students perform hazardous chemistry or physics experiments safely, with guided steps and scoring.', deliverables: ['VR scene', 'Guided steps', 'Scoring system'], difficulty: 'Intermediate' },
  { id: 'PS09', code: 'PS-09', track: 'Semiconductors', title: 'Chip Layout Visualizer', summary: 'Interactive explorer for VLSI layouts.', description: 'Design an interactive tool that visualizes VLSI floorplans and highlights congestion and timing hotspots for students learning chip design.', deliverables: ['Layout parser', 'Interactive viewer', 'Hotspot analysis'], difficulty: 'Advanced' },
  { id: 'PS10', code: 'PS-10', track: 'AI / ML', title: 'Sign Language Interpreter', summary: 'Real-time sign-to-text translation.', description: 'Create a real-time system that translates sign language gestures to text and speech using computer vision, optimized for on-device inference.', deliverables: ['Gesture model', 'On-device runtime', 'Accessible UI'], difficulty: 'Advanced' },
  { id: 'PS11', code: 'PS-11', track: 'EdTech', title: 'Peer Review Platform', summary: 'Fair, anonymized peer grading at scale.', description: 'Build a platform that distributes assignments for anonymized peer review, calibrates grades and flags outliers for instructor attention.', deliverables: ['Assignment routing', 'Calibration algorithm', 'Instructor console'], difficulty: 'Beginner' },
  { id: 'PS12', code: 'PS-12', track: 'E-Commerce', title: 'Circular Marketplace', summary: 'Resale platform with trust scoring.', description: 'Design a student resale marketplace with verified listings, escrow-style trust and a sustainability impact score for each item.', deliverables: ['Listing verification', 'Trust scoring', 'Impact meter'], difficulty: 'Beginner' },
  { id: 'PS13', code: 'PS-13', track: 'Communications', title: 'Disaster Mesh Network', summary: 'Off-grid messaging when towers fail.', description: 'Build a resilient mesh messaging app that keeps communities connected during outages using device-to-device relays.', deliverables: ['Mesh protocol', 'Message relay', 'Offline maps'], difficulty: 'Advanced' },
  { id: 'PS14', code: 'PS-14', track: 'Quantum', title: 'QKD Simulator', summary: 'Teach quantum key distribution visually.', description: 'Create an interactive simulator that demonstrates BB84 key distribution, eavesdropping detection and error rates for learners.', deliverables: ['BB84 simulation', 'Eavesdrop mode', 'Teaching mode'], difficulty: 'Advanced' },
  { id: 'PS15', code: 'PS-15', track: 'GreenTech', title: 'EV Charge Router', summary: 'Plan long trips around charging stations.', description: 'Design a trip planner that routes EV drivers through optimal charging stops based on battery, traffic and station availability.', deliverables: ['Routing engine', 'Live availability', 'Battery model'], difficulty: 'Intermediate' },
  { id: 'PS16', code: 'PS-16', track: 'IoT', title: 'Smart Irrigation', summary: 'Water crops only when needed.', description: 'Build an IoT irrigation controller that uses soil-moisture and weather data to water crops efficiently and reports savings.', deliverables: ['Sensor integration', 'Control logic', 'Savings report'], difficulty: 'Beginner' },
  { id: 'PS17', code: 'PS-17', track: 'HealthTech', title: 'Mental Wellness Companion', summary: 'Private, supportive check-ins for students.', description: 'Create a privacy-first companion that offers mood check-ins, coping exercises and escalation to counselors when needed.', deliverables: ['Check-in flow', 'Resource library', 'Escalation path'], difficulty: 'Intermediate' },
  { id: 'PS18', code: 'PS-18', track: 'AI / ML', title: 'Document Q&A Assistant', summary: 'Ask questions across large document sets.', description: 'Build a retrieval-augmented assistant that answers questions grounded in a user’s documents with citations and confidence.', deliverables: ['Retrieval pipeline', 'Cited answers', 'Confidence scoring'], difficulty: 'Intermediate' },
  { id: 'PS19', code: 'PS-19', track: 'Robotics', title: 'Assistive Drone Pilot', summary: 'Gesture-controlled drone for inspections.', description: 'Design a drone control system that responds to simple gestures for safe, hands-light infrastructure inspection.', deliverables: ['Gesture control', 'Stabilization', 'Inspection log'], difficulty: 'Advanced' },
  { id: 'PS20', code: 'PS-20', track: 'Cybersecurity', title: 'Secrets Scanner', summary: 'Catch leaked credentials in repos.', description: 'Build a scanner that detects secrets in code repositories, ranks severity and suggests safe remediation steps.', deliverables: ['Detection rules', 'Severity ranking', 'Fix suggestions'], difficulty: 'Intermediate' },
  { id: 'PS21', code: 'PS-21', track: 'FinTech', title: 'Fraud Graph Explorer', summary: 'Spot fraud rings via network analysis.', description: 'Create a graph analytics tool that surfaces suspicious transaction rings and visualizes them for analysts.', deliverables: ['Graph builder', 'Anomaly detection', 'Analyst view'], difficulty: 'Advanced' },
  { id: 'PS22', code: 'PS-22', track: 'AR / VR', title: 'Campus AR Navigator', summary: 'Turn-by-turn AR wayfinding indoors.', description: 'Build an AR app that guides visitors through campus buildings with indoor positioning and points of interest.', deliverables: ['Indoor positioning', 'AR overlays', 'POI system'], difficulty: 'Intermediate' },
  { id: 'PS23', code: 'PS-23', track: 'EdTech', title: 'Code Mentor Bot', summary: 'Explain and debug student code kindly.', description: 'Create an assistant that reviews student code, explains errors in plain language and suggests learning resources.', deliverables: ['Code analysis', 'Plain-language hints', 'Resource links'], difficulty: 'Beginner' },
  { id: 'PS24', code: 'PS-24', track: 'GreenTech', title: 'Carbon Footprint Tracker', summary: 'Measure and reduce personal emissions.', description: 'Design an app that estimates a user’s carbon footprint from daily activities and gamifies reduction goals.', deliverables: ['Emission model', 'Goal gamification', 'Progress insights'], difficulty: 'Beginner' },
  { id: 'PS25', code: 'PS-25', track: 'Open Innovation', title: 'Wildcard Challenge', summary: 'Bring your own bold idea.', description: 'No constraints — pitch and build any solution that addresses a real problem within a Codefiesta focus area. Judged on originality, impact and execution.', deliverables: ['Working prototype', 'Impact narrative', 'Live demo'], difficulty: 'Intermediate' },
]

export type FaqItem = { q: string; a: string }

export const FAQS: FaqItem[] = [
  { q: 'Who can participate in Codefiesta 2026?', a: 'Any student currently enrolled in an undergraduate or postgraduate program across any recognized college or university is eligible. You do not have to study at GIT Jaipur to join.' },
  { q: 'What is the team size?', a: 'Teams can have 2 to 4 members. Solo participation is allowed but we strongly recommend forming a team — you can also find teammates during the Team Formation session on Day 1.' },
  { q: 'Is there a registration fee?', a: 'Registration is free for all participants. Selected teams will receive a confirmation email with further details after the shortlisting round.' },
  { q: 'Do I need to know all the focus areas?', a: 'Not at all. Pick one track that excites you the most. The 8 focus areas simply define the problem space — your solution only needs to fit one.' },
  { q: 'What should I bring?', a: 'Bring your laptop, chargers, a valid college ID and your enthusiasm. Food, Wi-Fi, workspace and swag are provided throughout the event.' },
  { q: 'Will accommodation be provided?', a: 'Yes, dormitory-style accommodation is available for outstation participants on request during registration, subject to availability.' },
  { q: 'How are projects judged?', a: 'Projects are evaluated on innovation, technical execution, impact, and presentation. Each track has domain mentors and a final panel of judges for the grand finale.' },
  { q: 'What do winners receive?', a: 'Cash prizes up to ₹30,000, medals, certificates, goodies and recruiter fast-tracks from our partners. Special prizes recognize the best idea, presentation and rookie team.' },
  { q: 'Can I start building before the event?', a: 'No. All code must be written during the 48-hour hacking window. You may plan ideas and design mockups in advance, but implementation begins at the official kickoff.' },
]

export type TeamMember = {
  name: string
  role: string
  image: string
  github?: string
  linkedin?: string
  twitter?: string
}

export const WEBSITE_TEAM: TeamMember[] = [
  { name: 'Akash Kumar1', role: 'Frontend & Motion', image: '/team-1.png', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Akash Kumar2', role: 'UI / UX Design', image: '/team-2.png', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Akash Kumar3', role: 'Full-Stack Dev', image: '/team-3.png', github: '#', linkedin: '#', twitter: '#' },
  { name: 'Akash Kumar4', role: 'Content & SEO', image: '/team-4.png', github: '#', linkedin: '#', twitter: '#' },
]

export const NAV_LINKS = [
  { label: 'Focus', href: '#focus' },
  { label: 'About', href: '#about' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Problems', href: '#problems' },
  { label: 'FAQ', href: '#faq' },
]
