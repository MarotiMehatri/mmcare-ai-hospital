import React, {
  useEffect,
  useState,
} from "react";

import {
  FiUpload,
  FiFileText,
  FiUser,
  FiCalendar,
  FiActivity,
  FiX,
} from "react-icons/fi";

import {
  createMedicalReport,
} from "../../services/MedicalReports/MedicalReportAPI";

const initialForm = {
  patientId: "",
  patientName: "",
  patientCode: "",
  age: "",
  gender: "",
  bloodGroup: "",
  department: "",

  title: "",
  reportTitle: "",
  reportType: "General",

  reportDate: new Date()
    .toISOString()
    .split("T")[0],

  status: "Uploaded",
  priority: "Normal",

  symptoms: "",
  diagnosis: "",
  description: "",
  doctorNotes: "",
};

function ReportUploadForm({
  patients = [],
  onSuccess,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [doctor, setDoctor] =
    useState({});

  useEffect(() => {
    try {
      const storedDoctor =
        JSON.parse(
          localStorage.getItem(
            "doctor"
          )
        ) || {};

      setDoctor(storedDoctor);
    } catch {
      setDoctor({});
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | PATIENT ID
  |--------------------------------------------------------------------------
  */
  const getPatientId = (patient) => {
    return (
      patient?._id ||
      patient?.id ||
      patient?.patientId ||
      patient?.userId ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PATIENT NAME
  |--------------------------------------------------------------------------
  */
  const getPatientName = (patient) => {
    return (
      patient?.FullName ||
      patient?.fullName ||
      patient?.name ||
      patient?.patientName ||
      [
        patient?.firstName,
        patient?.lastName,
      ]
        .filter(Boolean)
        .join(" ") ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PATIENT CODE
  |--------------------------------------------------------------------------
  */
  const getPatientCode = (patient) => {
    return (
      patient?.patientCode ||
      patient?.patientNumber ||
      patient?.code ||
      patient?.registrationNumber ||
      patient?.id ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE NORMAL INPUT
  |--------------------------------------------------------------------------
  */
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE PATIENT
  |--------------------------------------------------------------------------
  */
  const handlePatientChange = (
    event
  ) => {
    const selectedId =
      event.target.value;

    const patient =
      patients.find(
        (item) =>
          String(
            getPatientId(item)
          ) === String(selectedId)
      );

    if (!patient) {
      setFormData((previous) => ({
        ...previous,
        patientId: selectedId,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,

      patientId:
        getPatientId(patient),

      patientName:
        getPatientName(patient),

      patientCode:
        getPatientCode(patient),

      age:
        patient?.age ||
        patient?.Age ||
        "",

      gender:
        patient?.gender ||
        patient?.Gender ||
        "",

      bloodGroup:
        patient?.bloodGroup ||
        patient?.blood_group ||
        "",
    }));

    setError("");
  };

  /*
  |--------------------------------------------------------------------------
  | HANDLE FILE
  |--------------------------------------------------------------------------
  */
  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0] ||
      null;

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only PDF, JPG and PNG files are allowed."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "File size must be less than 10 MB."
      );

      event.target.value = "";
      setSelectedFile(null);

      return;
    }

    setSelectedFile(file);
    setError("");
    setSuccess("");
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE SELECTED FILE
  |--------------------------------------------------------------------------
  */
  const removeSelectedFile = () => {
    setSelectedFile(null);

    const input =
      document.getElementById(
        "medical-report-file"
      );

    if (input) {
      input.value = "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESET FORM
  |--------------------------------------------------------------------------
  */
  const resetForm = () => {
    setFormData({
      ...initialForm,
      reportDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setSelectedFile(null);

    const input =
      document.getElementById(
        "medical-report-file"
      );

    if (input) {
      input.value = "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */
  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
    |----------------------------------------------------------------------
    | VALIDATION
    |----------------------------------------------------------------------
    */

    if (!formData.patientId) {
      setError(
        "Please select a patient."
      );

      return;
    }

    if (
      !formData.title.trim()
    ) {
      setError(
        "Please enter the report title."
      );

      return;
    }

    if (!formData.reportDate) {
      setError(
        "Please select the report date."
      );

      return;
    }

    if (
      !formData.description.trim()
    ) {
      setError(
        "Please enter the report description."
      );

      return;
    }

    try {
      setSubmitting(true);

      /*
      |--------------------------------------------------------------------------
      | FORM DATA
      |--------------------------------------------------------------------------
      */

      const data =
        new FormData();

      data.append(
        "patientId",
        String(formData.patientId)
      );

      data.append(
        "patientName",
        formData.patientName
      );

      data.append(
        "patientCode",
        formData.patientCode
      );

      data.append(
        "age",
        formData.age
      );

      data.append(
        "gender",
        formData.gender
      );

      data.append(
        "bloodGroup",
        formData.bloodGroup
      );

      data.append(
        "department",
        formData.department
      );

      data.append(
        "title",
        formData.title
      );

      data.append(
        "reportTitle",
        formData.title
      );

      data.append(
        "reportType",
        formData.reportType
      );

      data.append(
        "reportDate",
        formData.reportDate
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "priority",
        formData.priority
      );

      data.append(
        "symptoms",
        formData.symptoms
      );

      data.append(
        "diagnosis",
        formData.diagnosis
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "doctorNotes",
        formData.doctorNotes
      );

      data.append(
        "doctorId",
        doctor?._id ||
          doctor?.id ||
          doctor?.doctorId ||
          ""
      );

      data.append(
        "doctorName",
        doctor?.FullName ||
          doctor?.fullName ||
          doctor?.name ||
          "Doctor"
      );

      data.append(
        "uploadedBy",
        doctor?.FullName ||
          doctor?.fullName ||
          doctor?.name ||
          "Doctor"
      );

      /*
      |--------------------------------------------------------------------------
      | ACTUAL FILE
      |--------------------------------------------------------------------------
      */
      if (selectedFile) {
        data.append(
          "file",
          selectedFile
        );
      }

      /*
      |--------------------------------------------------------------------------
      | API CALL
      |--------------------------------------------------------------------------
      */

      const response =
        await createMedicalReport(
          data
        );

      if (
        response?.data?.success ===
        false
      ) {
        throw new Error(
          response?.data?.message ||
            "Failed to upload medical report."
        );
      }

      setSuccess(
        "Medical report uploaded successfully."
      );

      resetForm();

      if (
        typeof onSuccess ===
        "function"
      ) {
        await onSuccess();
      }
    } catch (uploadError) {
      console.error(
        "Medical report upload failed:",
        uploadError
      );

      setError(
        uploadError?.response?.data
          ?.message ||
          uploadError?.message ||
          "Failed to upload medical report."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="report-upload-card">
      <div className="report-upload-header">
        <div className="report-upload-icon">
          <FiFileText />
        </div>

        <div>
          <h3>
            Upload Medical Report
          </h3>

          <p>
            Add a medical report for
            the selected patient.
          </p>
        </div>
      </div>

      {error && (
        <div className="report-form-alert report-form-error">
          {error}
        </div>
      )}

      {success && (
        <div className="report-form-alert report-form-success">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="report-upload-form"
      >
        {/* PATIENT */}

        <div className="report-form-section">
          <div className="report-section-title">
            <FiUser />
            <span>
              Patient Information
            </span>
          </div>

          <div className="report-form-grid">
            <div className="report-form-group">
              <label>
                Patient
                <span>*</span>
              </label>

              <select
                value={
                  formData.patientId
                }
                onChange={
                  handlePatientChange
                }
                required
              >
                <option value="">
                  Select patient
                </option>

                {patients.map(
                  (
                    patient,
                    index
                  ) => {
                    const patientId =
                      getPatientId(
                        patient
                      );

                    return (
                      <option
                        key={`patient-option-${String(
                          patientId
                        )}-${index}`}
                        value={
                          patientId
                        }
                      >
                        {getPatientName(
                          patient
                        ) ||
                          `Patient ${index + 1}`}
                        {" - "}
                        {getPatientCode(
                          patient
                        )}
                      </option>
                    );
                  }
                )}
              </select>
            </div>

            <div className="report-form-group">
              <label>
                Patient Code
              </label>

              <input
                type="text"
                value={
                  formData.patientCode
                }
                readOnly
                placeholder="Patient code"
              />
            </div>

            <div className="report-form-group">
              <label>
                Patient Name
              </label>

              <input
                type="text"
                value={
                  formData.patientName
                }
                readOnly
                placeholder="Patient name"
              />
            </div>

            <div className="report-form-group">
              <label>
                Age
              </label>

              <input
                type="text"
                value={
                  formData.age
                }
                onChange={
                  handleChange
                }
                name="age"
                placeholder="Age"
              />
            </div>

            <div className="report-form-group">
              <label>
                Gender
              </label>

              <select
                name="gender"
                value={
                  formData.gender
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="report-form-group">
              <label>
                Blood Group
              </label>

              <select
                name="bloodGroup"
                value={
                  formData.bloodGroup
                }
                onChange={
                  handleChange
                }
              >
                <option value="">
                  Select blood group
                </option>

                <option value="A+">
                  A+
                </option>

                <option value="A-">
                  A-
                </option>

                <option value="B+">
                  B+
                </option>

                <option value="B-">
                  B-
                </option>

                <option value="AB+">
                  AB+
                </option>

                <option value="AB-">
                  AB-
                </option>

                <option value="O+">
                  O+
                </option>

                <option value="O-">
                  O-
                </option>
              </select>
            </div>

            <div className="report-form-group">
              <label>
                Department
              </label>

              <input
                type="text"
                name="department"
                value={
                  formData.department
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Cardiology"
              />
            </div>
          </div>
        </div>

        {/* REPORT */}

        <div className="report-form-section">
          <div className="report-section-title">
            <FiActivity />
            <span>
              Report Information
            </span>
          </div>

          <div className="report-form-grid">
            <div className="report-form-group report-form-full">
              <label>
                Report Title
                <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                placeholder="e.g. Complete Blood Count"
                required
              />
            </div>

            <div className="report-form-group">
              <label>
                Report Type
              </label>

              <select
                name="reportType"
                value={
                  formData.reportType
                }
                onChange={
                  handleChange
                }
              >
                <option value="General">
                  General
                </option>

                <option value="Blood Test">
                  Blood Test
                </option>

                <option value="Lipid Profile">
                  Lipid Profile
                </option>

                <option value="Urine Test">
                  Urine Test
                </option>

                <option value="X-Ray">
                  X-Ray
                </option>

                <option value="CT Scan">
                  CT Scan
                </option>

                <option value="MRI">
                  MRI
                </option>

                <option value="Ultrasound">
                  Ultrasound
                </option>

                <option value="ECG">
                  ECG
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="report-form-group">
              <label>
                Report Date
                <span>*</span>
              </label>

              <div className="report-input-icon">
                <FiCalendar />

                <input
                  type="date"
                  name="reportDate"
                  value={
                    formData.reportDate
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>
            </div>

            <div className="report-form-group">
              <label>
                Status
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Uploaded">
                  Uploaded
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Reviewed">
                  Reviewed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            <div className="report-form-group">
              <label>
                Priority
              </label>

              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
              >
                <option value="Low">
                  Low
                </option>

                <option value="Normal">
                  Normal
                </option>

                <option value="High">
                  High
                </option>

                <option value="Urgent">
                  Urgent
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* FILE */}

        <div className="report-form-section">
          <div className="report-section-title">
            <FiUpload />
            <span>
              Report File
            </span>
          </div>

          <div className="report-file-upload">
            {!selectedFile ? (
              <label
                htmlFor="medical-report-file"
                className="report-file-label"
              >
                <FiUpload />

                <strong>
                  Select medical report
                </strong>

                <span>
                  PDF, JPG or PNG
                  • Maximum 10 MB
                </span>

                <input
                  id="medical-report-file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={
                    handleFileChange
                  }
                />
              </label>
            ) : (
              <div className="selected-report-file">
                <FiFileText />

                <div>
                  <strong>
                    {
                      selectedFile.name
                    }
                  </strong>

                  <span>
                    {(
                      selectedFile.size /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </span>
                </div>

                <button
                  type="button"
                  onClick={
                    removeSelectedFile
                  }
                  aria-label="Remove file"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CLINICAL */}

        <div className="report-form-section">
          <div className="report-section-title">
            <FiFileText />
            <span>
              Clinical Information
            </span>
          </div>

          <div className="report-form-grid">
            <div className="report-form-group report-form-full">
              <label>
                Symptoms
              </label>

              <textarea
                name="symptoms"
                value={
                  formData.symptoms
                }
                onChange={
                  handleChange
                }
                rows="3"
                placeholder="Enter patient symptoms..."
              />
            </div>

            <div className="report-form-group report-form-full">
              <label>
                Diagnosis
              </label>

              <textarea
                name="diagnosis"
                value={
                  formData.diagnosis
                }
                onChange={
                  handleChange
                }
                rows="3"
                placeholder="Enter diagnosis..."
              />
            </div>

            <div className="report-form-group report-form-full">
              <label>
                Description
                <span>*</span>
              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="4"
                placeholder="Enter report description..."
                required
              />
            </div>

            <div className="report-form-group report-form-full">
              <label>
                Doctor Notes
              </label>

              <textarea
                name="doctorNotes"
                value={
                  formData.doctorNotes
                }
                onChange={
                  handleChange
                }
                rows="4"
                placeholder="Enter additional doctor notes..."
              />
            </div>
          </div>
        </div>

        {/* ACTION */}

        <div className="report-form-actions">
          <button
            type="button"
            className="report-cancel-button"
            onClick={
              resetForm
            }
            disabled={
              submitting
            }
          >
            Reset
          </button>

          <button
            type="submit"
            className="report-submit-button"
            disabled={
              submitting
            }
          >
            <FiUpload />

            {submitting
              ? "Uploading..."
              : "Upload Medical Report"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportUploadForm;