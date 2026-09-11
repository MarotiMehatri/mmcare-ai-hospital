import api from "../../api/axios";

/* ============================================================
   GET NOTIFICATIONS
============================================================ */

export const getNotifications = async (
  patientId,
) => {
  if (!patientId) {
    throw new Error(
      "Patient ID is required",
    );
  }

  return api.get(
    "/notifications",
    {
      params: {
        patientId,
      },
    },
  );
};

/* ============================================================
   CREATE NOTIFICATION
============================================================ */

export const createNotification = async (
  notificationData,
) => {
  return api.post(
    "/notifications",
    notificationData,
  );
};

/* ============================================================
   UPDATE NOTIFICATION
============================================================ */

export const updateNotification = async (
  notificationId,
  notificationData,
) => {
  if (!notificationId) {
    throw new Error(
      "Notification ID is required",
    );
  }

  return api.put(
    `/notifications/${notificationId}`,
    notificationData,
  );
};

/* ============================================================
   DELETE NOTIFICATION
============================================================ */

export const deleteNotification = async (
  notificationId,
) => {
  if (!notificationId) {
    throw new Error(
      "Notification ID is required",
    );
  }

  return api.delete(
    `/notifications/${notificationId}`,
  );
};