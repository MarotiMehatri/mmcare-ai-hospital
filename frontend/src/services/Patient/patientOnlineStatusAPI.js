import api from "../../api/axios";

/* ================================
   PATIENT ONLINE STATUS API
================================ */

/**
 * Get all patient online statuses
 * GET /patientOnlineStatus
 */
export const getPatientOnlineStatus = async () => {
  try {
    const response = await api.get("/patientOnlineStatus");
    return response;
  } catch (error) {
    console.error("Error fetching patient online status:", error);
    throw error;
  }
};

/**
 * Get online status by patient ID
 * GET /patientOnlineStatus/:patientId
 */
export const getPatientOnlineStatusById = async (patientId) => {
  try {
    const response = await api.get(`/patientOnlineStatus/${patientId}`);
    return response;
  } catch (error) {
    console.error("Error fetching patient online status by ID:", error);
    throw error;
  }
};

/**
 * Update patient online status
 * PATCH /patientOnlineStatus/:patientId
 */
export const updatePatientOnlineStatus = async (patientId, statusData) => {
  try {
    const response = await api.patch(
      `/patientOnlineStatus/${patientId}`,
      statusData,
    );
    return response;
  } catch (error) {
    console.error("Error updating patient online status:", error);
    throw error;
  }
};

/**
 * Set patient online
 */
export const setPatientOnline = async (patientId) => {
  return updatePatientOnlineStatus(patientId, {
    isOnline: true,
    lastSeen: new Date().toISOString(),
  });
};

/**
 * Set patient offline
 */
export const setPatientOffline = async (patientId) => {
  return updatePatientOnlineStatus(patientId, {
    isOnline: false,
    lastSeen: new Date().toISOString(),
  });
};

export default {
  getPatientOnlineStatus,
  getPatientOnlineStatusById,
  updatePatientOnlineStatus,
  setPatientOnline,
  setPatientOffline,
};
