let memoryRecords = [
  {
    id: "mem_1",
    patientId: 1,
    patientID: "PAT100001",
    type: "allergy",
    title: "Penicillin allergy",
    summary: "Patient has a known allergy to penicillin.",
    priority: "high",
    tags: ["allergy", "penicillin"],
    source: "doctor-note",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mem_2",
    patientId: 1,
    patientID: "PAT100001",
    type: "symptom",
    title: "Repeated headache complaint",
    summary: "Patient reported headache multiple times this week.",
    priority: "medium",
    tags: ["headache", "repeat"],
    source: "ai-chat",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getAllMemoryRecords = () => memoryRecords;

export const setAllMemoryRecords = (records) => {
  memoryRecords = records;
};

export const addMemoryRecords = (records) => {
  memoryRecords = [...records, ...memoryRecords];
};

export const addSingleMemoryRecord = (record) => {
  memoryRecords = [record, ...memoryRecords];
};
