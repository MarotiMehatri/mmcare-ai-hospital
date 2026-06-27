import api from "../../api/axios";

/* ==========================
      DOCTOR PAYMENT API
========================== */

export const getDoctorPayments = async () => {
  const response = await api.get("/doctorPayments");
  return response.data;
};

export const createDoctorPayment = async (data) => {
  const response = await api.post("/doctorPayments", data);
  return response.data;
};

export const deleteDoctorPayment = async (id) => {
  await api.delete(`/doctorPayments/${id}`);
};

export const updateDoctorPayment = async (id, data) => {
  const response = await api.put(`/doctorPayments/${id}`, data);
  return response.data;
};

/* ==========================
      PATIENT PAYMENT HELPERS
========================== */

export const getPaymentsByPatientId = async (patientId) => {
  const response = await api.get("/doctorPayments");

  const payments = response?.data?.data || response?.data || [];

  return payments.filter(
    (payment) => String(payment.patientId) === String(patientId),
  );
};

export const getPaymentsByDoctorId = async (doctorId) => {
  const response = await api.get("/doctorPayments");

  const payments = response?.data?.data || response?.data || [];

  return payments.filter(
    (payment) => String(payment.doctorId) === String(doctorId),
  );
};

export const getTotalPaidAmount = async (patientId) => {
  const payments = await getPaymentsByPatientId(patientId);

  return payments
    .filter((p) => p.paymentStatus === "Paid")
    .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);
};

export const getTotalPendingAmount = async (patientId) => {
  const payments = await getPaymentsByPatientId(patientId);

  return payments
    .filter((p) => p.paymentStatus === "Pending")
    .reduce((sum, p) => sum + Number(p.totalAmount || 0), 0);
};

export const getPaymentSummary = async (patientId) => {
  const payments = await getPaymentsByPatientId(patientId);

  const totalBills = payments.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0,
  );

  const paidAmount = payments
    .filter((item) => item.paymentStatus === "Paid")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  const pendingAmount = payments
    .filter((item) => item.paymentStatus === "Pending")
    .reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);

  return {
    totalBills,
    paidAmount,
    pendingAmount,
    totalPayments: payments.length,
  };
};
