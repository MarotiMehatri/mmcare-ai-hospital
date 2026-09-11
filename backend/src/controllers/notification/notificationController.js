import mongoose from "mongoose";
import Notification from "../../models/Notification.js";

/* ============================================================
   HELPERS
============================================================ */

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const formatNotification = (notification) => {
  if (!notification) return null;

  const data =
    typeof notification.toJSON === "function"
      ? notification.toJSON()
      : notification;

  return {
    ...data,

    id:
      data.id ||
      data._id?.toString(),

    patientId:
      data.patientId?.toString?.() ||
      data.patientId,

    doctorId:
      data.doctorId?.toString?.() ||
      data.doctorId,

    userId:
      data.userId?.toString?.() ||
      data.userId,
  };
};

/* ============================================================
   GET NOTIFICATIONS
   GET /api/notifications?patientId=xxxxx
============================================================ */

export const getNotifications = async (
  req,
  res,
) => {
  try {
    const {
      patientId,
      doctorId,
      userId,
      isRead,
      type,
      limit = 100,
    } = req.query;

    const query = {};

    /* --------------------------------------------------------
       PATIENT
    -------------------------------------------------------- */

    if (patientId) {
      if (!isValidObjectId(patientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid patientId",
        });
      }

      query.patientId = patientId;
    }

    /* --------------------------------------------------------
       DOCTOR
    -------------------------------------------------------- */

    if (doctorId) {
      if (!isValidObjectId(doctorId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid doctorId",
        });
      }

      query.doctorId = doctorId;
    }

    /* --------------------------------------------------------
       USER
    -------------------------------------------------------- */

    if (userId) {
      if (!isValidObjectId(userId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId",
        });
      }

      query.userId = userId;
    }

    /* --------------------------------------------------------
       READ STATUS
    -------------------------------------------------------- */

    if (typeof isRead !== "undefined") {
      query.isRead =
        String(isRead).toLowerCase() ===
        "true";
    }

    /* --------------------------------------------------------
       TYPE
    -------------------------------------------------------- */

    if (type) {
      query.type = String(type)
        .trim()
        .toLowerCase();
    }

    /* --------------------------------------------------------
       LIMIT
    -------------------------------------------------------- */

    const safeLimit = Math.min(
      Math.max(Number(limit) || 100, 1),
      500,
    );

    /* --------------------------------------------------------
       DATABASE
    -------------------------------------------------------- */

    const notifications =
      await Notification.find(query)
        .sort({
          createdAt: -1,
        })
        .limit(safeLimit)
        .lean();

    const formatted =
      notifications.map(
        formatNotification,
      );

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error(
      "❌ FETCH NOTIFICATIONS ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch notifications",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   CREATE NOTIFICATION
   POST /api/notifications
============================================================ */

export const createNotification = async (
  req,
  res,
) => {
  try {
    const {
      patientId,
      doctorId,
      userId,
      title,
      message,
      type,
      isRead,
      link,
    } = req.body;

    /* --------------------------------------------------------
       VALIDATION
    -------------------------------------------------------- */

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message:
          "patientId is required",
      });
    }

    if (!isValidObjectId(patientId)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid patientId",
      });
    }

    if (
      doctorId &&
      !isValidObjectId(doctorId)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid doctorId",
      });
    }

    if (
      userId &&
      !isValidObjectId(userId)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid userId",
      });
    }

    if (
      !title ||
      !String(title).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Notification title is required",
      });
    }

    if (
      !message ||
      !String(message).trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Notification message is required",
      });
    }

    /* --------------------------------------------------------
       CREATE
    -------------------------------------------------------- */

    const notification =
      await Notification.create({
        patientId,

        doctorId:
          doctorId || null,

        userId:
          userId || null,

        title: String(title).trim(),

        message:
          String(message).trim(),

        type:
          type || "general",

        isRead:
          typeof isRead === "boolean"
            ? isRead
            : false,

        link:
          link || "",
      });

    return res.status(201).json({
      success: true,
      message:
        "Notification created successfully",
      data:
        formatNotification(
          notification,
        ),
    });
  } catch (error) {
    console.error(
      "❌ CREATE NOTIFICATION ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create notification",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   UPDATE NOTIFICATION
   PUT /api/notifications/:id
============================================================ */

export const updateNotification = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid notification ID",
      });
    }

    const updateData = {};

    if (
      typeof req.body.title ===
      "string"
    ) {
      updateData.title =
        req.body.title.trim();
    }

    if (
      typeof req.body.message ===
      "string"
    ) {
      updateData.message =
        req.body.message.trim();
    }

    if (
      typeof req.body.isRead ===
      "boolean"
    ) {
      updateData.isRead =
        req.body.isRead;
    }

    if (
      typeof req.body.type ===
      "string"
    ) {
      updateData.type =
        req.body.type
          .trim()
          .toLowerCase();
    }

    if (
      typeof req.body.link ===
      "string"
    ) {
      updateData.link =
        req.body.link.trim();
    }

    if (
      Object.keys(updateData)
        .length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No valid fields to update",
      });
    }

    const updated =
      await Notification.findByIdAndUpdate(
        id,
        {
          $set: updateData,
        },
        {
          new: true,
          runValidators: true,
        },
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Notification updated successfully",
      data:
        formatNotification(updated),
    });
  } catch (error) {
    console.error(
      "❌ UPDATE NOTIFICATION ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update notification",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   DELETE NOTIFICATION
   DELETE /api/notifications/:id
============================================================ */

export const deleteNotification = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid notification ID",
      });
    }

    const deleted =
      await Notification.findByIdAndDelete(
        id,
      );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Notification deleted successfully",
      data:
        formatNotification(deleted),
    });
  } catch (error) {
    console.error(
      "❌ DELETE NOTIFICATION ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete notification",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};