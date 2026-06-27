import {
  FaComments,
  FaNotesMedical,
  FaCalendarCheck,
  FaCapsules,
  FaHeartbeat,
  FaFileMedical,
  FaBrain,
  FaLightbulb,
  FaMapMarkedAlt,
  FaMicrochip,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

export const aiToolsData = [
  {
    id: 1,
    title: "AI Chat",
    description:
      "Ask patient-health questions and get detailed hospital-friendly guidance.",
    icon: FaComments,
    badge: "Core AI",
    type: "chat",
    path: "/ai-health/ai-chat",
  },
  {
    id: 2,
    title: "Symptom Checker",
    description:
      "Analyze symptoms and get possible causes, precautions, and next steps.",
    icon: FaHeartbeat,
    badge: "AI Tool",
    type: "symptom",
    path: "/ai-health/symptom-checker",
  },
  {
    id: 3,
    title: "Diagnosis",
    description:
      "Get AI-based diagnosis suggestions and clinical understanding support.",
    icon: FaNotesMedical,
    badge: "Clinical Support",
    type: "diagnosis",
    path: "/ai-health/diagnosis",
  },
  {
    id: 4,
    title: "AI Appointment",
    description:
      "Get department suggestions, doctor recommendations, and booking help.",
    icon: FaCalendarCheck,
    badge: "AI Tool",
    type: "appointment",
    path: "/ai-health/appointment",
  },
  {
    id: 5,
    title: "Medicine Reminder",
    description:
      "Track schedules, refill alerts, daily doses, and smart reminders.",
    icon: FaCapsules,
    badge: "AI Tool",
    type: "reminder",
    path: "/ai-health/medicine-reminder",
  },
  {
    id: 6,
    title: "Health Trends",
    description:
      "Visualize patterns in vitals, symptoms, and health progress over time.",
    icon: FaChartLine,
    badge: "Analytics",
    type: "trends",
    path: "/ai-health/health-trends",
  },
  {
    id: 7,
    title: "Report Analyzer",
    description:
      "Upload and understand reports with simplified AI-based explanation.",
    icon: FaFileMedical,
    badge: "AI Tool",
    type: "report",
    path: "/ai-health/report-analyzer",
  },
  {
    id: 8,
    title: "AI Triage",
    description:
      "Check urgency levels and understand whether symptoms may need quick care.",
    icon: FaExclamationTriangle,
    badge: "Emergency Support",
    type: "triage",
    path: "/ai-health/triage",
  },
  {
    id: 9,
    title: "AI Suggestions",
    description:
      "Receive personalized suggestions based on history, symptoms, and profile.",
    icon: FaLightbulb,
    badge: "Smart AI",
    type: "suggestions",
    path: "/ai-health/suggestions",
  },
  {
    id: 10,
    title: "AI Memory",
    description:
      "Preserve useful patient context to make future conversations smarter.",
    icon: FaBrain,
    badge: "Smart AI",
    type: "memory",
    path: "/ai-health/memory",
  },
  {
    id: 11,
    title: "Nearby Services",
    description:
      "Find nearby hospitals, labs, doctors, and emergency care locations.",
    icon: FaMapMarkedAlt,
    badge: "Location AI",
    type: "nearby",
    path: "/ai-health/nearby-services",
  },
  {
    id: 12,
    title: "AI Integration",
    description:
      "Connect all AI tools into one smart hospital workflow experience.",
    icon: FaMicrochip,
    badge: "System AI",
    type: "integration",
    path: "/ai-health/integration",
  },
];
