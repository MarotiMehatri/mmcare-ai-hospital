import axios from "axios";


const BILLING_BASE_URL = "http://localhost:5000/billings";

export const getBillingsByPatientId = async (patientId) => {
  const response = await axios.get(
    `${BILLING_BASE_URL}?patientId=${patientId}`,
  );
  return response.data;
};
