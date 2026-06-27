import api from "../../api/axios";

const getBillsArray = (res) => {
  if (Array.isArray(res.data)) return res.data;

  return res.data.doctorPayments || res.data.data || res.data.bills || [];
};

export const getAllBills = async () => {
  const res = await api.get("/doctorPayments");
  return {
    ...res,
    data: getBillsArray(res),
  };
};

export const getRecentBills = async () => {
  const res = await api.get("/doctorPayments");

  const bills = getBillsArray(res);

  const sorted = [...bills].sort(
    (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate),
  );

  return { data: sorted.slice(0, 3) };
};

export const updateBillPaymentStatus = (id, paymentStatus) =>
  api.patch(`/doctorPayments/${id}`, { paymentStatus });

export const deleteBill = (id) => api.delete(`/doctorPayments/${id}`);

export default api;
