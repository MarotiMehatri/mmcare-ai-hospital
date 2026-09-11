import api from "../../api/axios";

/* ============================================================
   GET MESSAGES
============================================================ */

export const getMessages = async (patientId) => {
  if (!patientId) {
    throw new Error(
      "Patient ID is required",
    );
  }

  return api.get("/messages", {
    params: {
      patientId,
    },
  });
};

/* ============================================================
   GET DOCTORS
============================================================ */

export const getDoctors = async () => {
  return api.get("/doctors");
};

/* ============================================================
   CREATE MESSAGE
============================================================ */

export const createMessage = async (
  messageData,
) => {
  if (!messageData?.patientId) {
    throw new Error(
      "Patient ID is required",
    );
  }

  if (!messageData?.sender) {
    throw new Error(
      "Sender is required",
    );
  }

  if (
    !messageData?.text &&
    !messageData?.message
  ) {
    throw new Error(
      "Message text is required",
    );
  }

  return api.post(
    "/messages",
    messageData,
  );
};

/* ============================================================
   UPDATE MESSAGE
============================================================ */

export const updateMessage = async (
  messageId,
  messageData,
) => {
  if (!messageId) {
    throw new Error(
      "Message ID is required",
    );
  }

  return api.put(
    `/messages/${messageId}`,
    messageData,
  );
};

/* ============================================================
   DELETE MESSAGE
============================================================ */

export const deleteMessage = async (
  messageId,
) => {
  if (!messageId) {
    throw new Error(
      "Message ID is required",
    );
  }

  return api.delete(
    `/messages/${messageId}`,
  );
};