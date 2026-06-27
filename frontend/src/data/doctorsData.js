//Utility for Random ID
const generateId = () => "DOC-" + Math.floor(100000 + Math.random() * 900000);

const doctors = [
  {
    id: generateId(),
    disease: "Fever",
    name: "Dr.Ashutosh Shukla",
    department: "General",
  },
  {
    id: generateId(),
    disease: "Cancer",
    name: "Dr. Suresh H. Advani",
    department: "Medical Oncology",
  },
  {
    id: generateId(),
    disease: "Diabetes",
    name: "Dr. Ambrish Mithal",
    department: "Internal Medicine",
  },
  {
    id: generateId(),
    disease: "Heart",
    name: "Dr. Ashok Seth",
    department: "Interventional Cardiology",
  },
  {
    id: generateId(),
    disease: "Food Allergies",
    name: "Dr. Prasanna Kumar Reddy",
    department: "Gastroenterology",
  },
  {
    id: generateId(),
    disease: "Migraine",
    name: "Dr. Praveen Gupta",
    department: "Neurology",
  },
  {
    id: generateId(),
    disease: "HIV/AIDS",
    name: "Dr. Ameet Dravid",
    department: "Dermatology",
  },
  {
    id: generateId(),
    disease: "Influenza",
    name: "Dr. Sandeep Budhiraja",
    department: "Pulmonology",
  },
  {
    id: generateId(),
    disease: "Tuberculosis",
    name: "Dr. Salil S. Bendre",
    department: "Pulmonologists",
  },
  {
    id: generateId(),
    disease: "Malaria",
    name: "Dr. Atul Somani",
    department: "Infectious Diseases",
  },
  {
    id: generateId(),
    disease: "Measles",
    name: "Dr. Charu Goel Sachdeva",
    department: "Pediatricians",
  },
];
export default doctors;
