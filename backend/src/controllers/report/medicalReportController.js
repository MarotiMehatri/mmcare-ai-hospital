// import MedicalReport from "../../models/MedicalReport.model.js";

// const getFileUrl = (req, file) => {
//   if (!file) {
//     return "";
//   }

//   const protocol = req.protocol;
//   const host = req.get("host");

//   return `${protocol}://${host}/uploads/reports/${file.filename}`;
// };

// /*
// |--------------------------------------------------------------------------
// | GET ALL MEDICAL REPORTS
// |--------------------------------------------------------------------------
// */
// export const getAllMedicalReports = async (req, res) => {
//   try {
//     const reports = await MedicalReport.find()
//       .sort({ createdAt: -1 })
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: reports.length,
//       data: reports,
//     });
//   } catch (error) {
//     console.error(
//       "getAllMedicalReports error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch medical reports",
//       error: error.message,
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | GET MEDICAL REPORT BY ID
// |--------------------------------------------------------------------------
// */
// export const getMedicalReportById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const report = await MedicalReport.findById(id).lean();

//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: "Medical report not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: report,
//     });
//   } catch (error) {
//     console.error(
//       "getMedicalReportById error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch medical report",
//       error: error.message,
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | GET REPORTS BY PATIENT ID
// |--------------------------------------------------------------------------
// */
// export const getMedicalReportsByPatientId = async (
//   req,
//   res
// ) => {
//   try {
//     const { patientId } = req.params;

//     if (!patientId) {
//       return res.status(400).json({
//         success: false,
//         message: "Patient ID is required",
//       });
//     }

//     const reports = await MedicalReport.find({
//       patientId: String(patientId),
//     })
//       .sort({
//         reportDate: -1,
//         createdAt: -1,
//       })
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: reports.length,
//       data: reports,
//     });
//   } catch (error) {
//     console.error(
//       "getMedicalReportsByPatientId error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch patient medical reports",
//       error: error.message,
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | CREATE MEDICAL REPORT
// |--------------------------------------------------------------------------
// */
// export const createMedicalReport = async (req, res) => {
//   try {
//     const {
//       patientId,
//       patientName,
//       patientCode,
//       age,
//       gender,
//       bloodGroup,
//       doctorId,
//       doctorName,
//       department,
//       title,
//       reportTitle,
//       reportType,
//       reportDate,
//       status,
//       priority,
//       symptoms,
//       diagnosis,
//       description,
//       doctorNotes,
//       uploadedBy,
//       createdBy,
//     } = req.body;

//     if (!patientId) {
//       return res.status(400).json({
//         success: false,
//         message: "Patient ID is required",
//       });
//     }

//     const finalTitle = (
//       title ||
//       reportTitle ||
//       ""
//     ).trim();

//     if (!finalTitle) {
//       return res.status(400).json({
//         success: false,
//         message: "Report title is required",
//       });
//     }

//     const fileUrl = getFileUrl(req, req.file);

//     const report = await MedicalReport.create({
//       patientId: String(patientId),

//       patientName: patientName || "",

//       patientCode: patientCode || "",

//       age: age || null,

//       gender: gender || "",

//       bloodGroup: bloodGroup || "",

//       doctorId: doctorId
//         ? String(doctorId)
//         : null,

//       doctorName: doctorName || "",

//       department: department || "",

//       title: finalTitle,

//       reportTitle:
//         reportTitle || finalTitle,

//       reportType:
//         reportType || "General",

//       reportDate:
//         reportDate || new Date(),

//       uploadDate: new Date(),

//       status:
//         status || "Uploaded",

//       priority:
//         priority || "Normal",

//       symptoms: symptoms || "",

//       diagnosis: diagnosis || "",

//       description: description || "",

//       doctorNotes: doctorNotes || "",

//       fileName:
//         req.file?.originalname || "",

//       fileUrl,

//       fileType:
//         req.file?.mimetype || "",

//       fileSize:
//         req.file?.size || 0,

//       uploadedBy:
//         uploadedBy || doctorName || "",

//       createdBy:
//         createdBy || null,
//     });

//     return res.status(201).json({
//       success: true,
//       message:
//         "Medical report uploaded successfully",
//       data: report,
//     });
//   } catch (error) {
//     console.error(
//       "createMedicalReport error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create medical report",
//       error: error.message,
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | UPDATE MEDICAL REPORT
// |--------------------------------------------------------------------------
// */
// export const updateMedicalReport = async (
//   req,
//   res
// ) => {
//   try {
//     const { id } = req.params;

//     const report = await MedicalReport.findById(id);

//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: "Medical report not found",
//       });
//     }

//     const allowedFields = [
//       "patientId",
//       "patientName",
//       "patientCode",
//       "age",
//       "gender",
//       "bloodGroup",
//       "doctorId",
//       "doctorName",
//       "department",
//       "title",
//       "reportTitle",
//       "reportType",
//       "reportDate",
//       "status",
//       "priority",
//       "symptoms",
//       "diagnosis",
//       "description",
//       "doctorNotes",
//       "uploadedBy",
//     ];

//     allowedFields.forEach((field) => {
//       if (
//         req.body[field] !== undefined
//       ) {
//         report[field] =
//           req.body[field];
//       }
//     });

//     if (
//       req.body.title &&
//       !req.body.reportTitle
//     ) {
//       report.reportTitle =
//         req.body.title;
//     }

//     if (
//       req.body.reportTitle &&
//       !req.body.title
//     ) {
//       report.title =
//         req.body.reportTitle;
//     }

//     if (req.file) {
//       report.fileName =
//         req.file.originalname;

//       report.fileType =
//         req.file.mimetype;

//       report.fileSize =
//         req.file.size;

//       report.fileUrl =
//         getFileUrl(req, req.file);
//     }

//     await report.save();

//     return res.status(200).json({
//       success: true,
//       message:
//         "Medical report updated successfully",
//       data: report,
//     });
//   } catch (error) {
//     console.error(
//       "updateMedicalReport error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Failed to update medical report",
//       error: error.message,
//     });
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | DELETE MEDICAL REPORT
// |--------------------------------------------------------------------------
// */
// export const deleteMedicalReport = async (
//   req,
//   res
// ) => {
//   try {
//     const { id } = req.params;

//     const report =
//       await MedicalReport.findById(id);

//     if (!report) {
//       return res.status(404).json({
//         success: false,
//         message: "Medical report not found",
//       });
//     }

//     await MedicalReport.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message:
//         "Medical report deleted successfully",
//     });
//   } catch (error) {
//     console.error(
//       "deleteMedicalReport error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Failed to delete medical report",
//       error: error.message,
//     });
//   }
// };

// backend/src/controllers/report/medicalReportController.js

import MedicalReport from "../../models/MedicalReport.model.js";

// ============================================================
// FILE URL HELPER
// ============================================================

const getFileUrl = (req, file) => {
  if (!file) {
    return "";
  }

  const protocol = req.protocol;
  const host = req.get("host");

  return `${protocol}://${host}/uploads/reports/${file.filename}`;
};

// ============================================================
// GET ALL MEDICAL REPORTS
// GET /api/medical-reports
// GET /api/reports
// ============================================================

export const getAllMedicalReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find({})
      .sort({
        createdAt: -1,
        reportDate: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error(
      "❌ getAllMedicalReports error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medical reports",
      error: error.message,
    });
  }
};

// ============================================================
// GET MEDICAL REPORT BY ID
// GET /api/medical-reports/:id
// ============================================================

export const getMedicalReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Medical report ID is required",
      });
    }

    const report = await MedicalReport.findById(id).lean();

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error(
      "❌ getMedicalReportById error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medical report",
      error: error.message,
    });
  }
};

// ============================================================
// GET MEDICAL REPORTS BY PATIENT ID
// GET /api/medical-reports/patient/:patientId
// ============================================================

export const getMedicalReportsByPatientId = async (
  req,
  res
) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required",
      });
    }

    const reports = await MedicalReport.find({
      patientId: String(patientId),
    })
      .sort({
        reportDate: -1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    console.error(
      "❌ getMedicalReportsByPatientId error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch patient medical reports",
      error: error.message,
    });
  }
};

// ============================================================
// CREATE MEDICAL REPORT
// POST /api/medical-reports
// ============================================================

export const createMedicalReport = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      patientCode,
      age,
      gender,
      bloodGroup,

      doctorId,
      doctorName,
      department,

      title,
      reportTitle,
      reportType,

      reportDate,
      status,
      priority,

      symptoms,
      diagnosis,
      description,
      doctorNotes,

      uploadedBy,
      createdBy,
    } = req.body;

    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "Patient ID is required",
      });
    }

    const finalTitle = String(
      title || reportTitle || ""
    ).trim();

    if (!finalTitle) {
      return res.status(400).json({
        success: false,
        message: "Report title is required",
      });
    }

    // --------------------------------------------------------
    // FILE
    // --------------------------------------------------------

    const fileUrl = getFileUrl(
      req,
      req.file
    );

    // --------------------------------------------------------
    // CREATE
    // --------------------------------------------------------

    const report = await MedicalReport.create({
      patientId: String(patientId),

      patientName: patientName || "",
      patientCode: patientCode || "",

      age:
        age !== undefined &&
        age !== null &&
        age !== ""
          ? Number(age)
          : null,

      gender: gender || "",
      bloodGroup: bloodGroup || "",

      doctorId: doctorId
        ? String(doctorId)
        : null,

      doctorName: doctorName || "",
      department: department || "",

      title: finalTitle,

      reportTitle:
        reportTitle || finalTitle,

      reportType:
        reportType || "General",

      reportDate:
        reportDate || new Date(),

      uploadDate: new Date(),

      status:
        status || "Uploaded",

      priority:
        priority || "Normal",

      symptoms: symptoms || "",
      diagnosis: diagnosis || "",
      description: description || "",
      doctorNotes: doctorNotes || "",

      fileName:
        req.file?.originalname || "",

      fileUrl,

      fileType:
        req.file?.mimetype || "",

      fileSize:
        req.file?.size || 0,

      uploadedBy:
        uploadedBy ||
        doctorName ||
        "",

      createdBy:
        createdBy || null,
    });

    return res.status(201).json({
      success: true,
      message:
        "Medical report uploaded successfully",
      data: report,
    });
  } catch (error) {
    console.error(
      "❌ createMedicalReport error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create medical report",
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE MEDICAL REPORT
// PUT /api/medical-reports/:id
// PATCH /api/medical-reports/:id
// ============================================================

export const updateMedicalReport = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Medical report ID is required",
      });
    }

    const report =
      await MedicalReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    // --------------------------------------------------------
    // ALLOWED FIELDS
    // --------------------------------------------------------

    const allowedFields = [
      "patientId",
      "patientName",
      "patientCode",
      "age",
      "gender",
      "bloodGroup",

      "doctorId",
      "doctorName",
      "department",

      "title",
      "reportTitle",
      "reportType",

      "reportDate",
      "status",
      "priority",

      "symptoms",
      "diagnosis",
      "description",
      "doctorNotes",

      "uploadedBy",
    ];

    // --------------------------------------------------------
    // UPDATE ONLY PROVIDED FIELDS
    // --------------------------------------------------------

    allowedFields.forEach((field) => {
      if (
        req.body[field] !== undefined
      ) {
        report[field] =
          req.body[field];
      }
    });

    // --------------------------------------------------------
    // KEEP TITLE / REPORT TITLE IN SYNC
    // --------------------------------------------------------

    if (
      req.body.title !== undefined &&
      req.body.reportTitle === undefined
    ) {
      report.reportTitle =
        req.body.title;
    }

    if (
      req.body.reportTitle !== undefined &&
      req.body.title === undefined
    ) {
      report.title =
        req.body.reportTitle;
    }

    // --------------------------------------------------------
    // PATIENT / DOCTOR IDS
    // --------------------------------------------------------

    if (
      req.body.patientId !== undefined
    ) {
      report.patientId =
        String(req.body.patientId);
    }

    if (
      req.body.doctorId !== undefined
    ) {
      report.doctorId =
        req.body.doctorId
          ? String(req.body.doctorId)
          : null;
    }

    // --------------------------------------------------------
    // FILE UPDATE
    // --------------------------------------------------------

    if (req.file) {
      report.fileName =
        req.file.originalname;

      report.fileType =
        req.file.mimetype;

      report.fileSize =
        req.file.size;

      report.fileUrl =
        getFileUrl(
          req,
          req.file
        );

      report.uploadDate =
        new Date();
    }

    await report.save();

    return res.status(200).json({
      success: true,
      message:
        "Medical report updated successfully",
      data: report,
    });
  } catch (error) {
    console.error(
      "❌ updateMedicalReport error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update medical report",
      error: error.message,
    });
  }
};

// ============================================================
// DELETE MEDICAL REPORT
// DELETE /api/medical-reports/:id
// ============================================================

export const deleteMedicalReport = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Medical report ID is required",
      });
    }

    const report =
      await MedicalReport.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Medical report not found",
      });
    }

    await MedicalReport.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Medical report deleted successfully",
    });
  } catch (error) {
    console.error(
      "❌ deleteMedicalReport error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete medical report",
      error: error.message,
    });
  }
};