import axios from "axios";

const API_URL =
  "http://localhost:8000/api/reports";

/*
|--------------------------------------------------------------------------
| GET ALL MEDICAL REPORTS
|--------------------------------------------------------------------------
*/
export const getAllMedicalReports = () => {
  return axios.get(API_URL);
};

/*
|--------------------------------------------------------------------------
| GET MEDICAL REPORT BY ID
|--------------------------------------------------------------------------
*/
export const getMedicalReportById = (id) => {
  return axios.get(
    `${API_URL}/${id}`
  );
};

/*
|--------------------------------------------------------------------------
| GET PATIENT REPORTS
|--------------------------------------------------------------------------
*/
export const getMedicalReportsByPatientId = (
  patientId
) => {
  return axios.get(
    `${API_URL}/patient/${patientId}`
  );
};

/*
|--------------------------------------------------------------------------
| CREATE MEDICAL REPORT
|--------------------------------------------------------------------------
*/
export const createMedicalReport = (
  formData
) => {
  return axios.post(
    API_URL,
    formData
  );
};

/*
|--------------------------------------------------------------------------
| UPDATE MEDICAL REPORT
|--------------------------------------------------------------------------
*/
export const updateMedicalReport = (
  id,
  data
) => {
  return axios.put(
    `${API_URL}/${id}`,
    data
  );
};

/*
|--------------------------------------------------------------------------
| DELETE MEDICAL REPORT
|--------------------------------------------------------------------------
*/
export const deleteMedicalReport = (
  id
) => {
  return axios.delete(
    `${API_URL}/${id}`
  );
};
