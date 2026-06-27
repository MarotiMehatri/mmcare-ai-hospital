// controllers/reportController.js

let reports = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    title: "Blood Test Report",
    description: "Normal blood test result",
    reportDate: "2026-06-22",
    status: "Completed",
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 1,
    title: "X-Ray Report",
    description: "Chest X-Ray report",
    reportDate: "2026-06-21",
    status: "Pending",
  },
];

// GET all reports
export const getReports = (req, res) => {
  res.status(200).json(reports);
};

// GET report by id
export const getReportById = (req, res) => {
  const report = reports.find((item) => item.id === Number(req.params.id));

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found",
    });
  }

  res.status(200).json(report);
};

// CREATE report
export const createReport = (req, res) => {
  const newReport = {
    id: reports.length + 1,
    ...req.body,
  };

  reports.push(newReport);

  res.status(201).json({
    success: true,
    message: "Report created successfully",
    data: newReport,
  });
};

// DELETE report
export const deleteReport = (req, res) => {
  reports = reports.filter((item) => item.id !== Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Report deleted successfully",
  });
};
