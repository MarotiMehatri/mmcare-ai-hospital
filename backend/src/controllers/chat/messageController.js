import mongoose from "mongoose";
import Message from "../../models/Message.js";

/* ============================================================
   HELPER FUNCTIONS
============================================================ */

/**
 * Check whether a MongoDB ID is valid.
 */
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Safely convert MongoDB document to API response.
 */
const formatMessage = (message) => {
  if (!message) return null;

  const data =
    typeof message.toJSON === "function"
      ? message.toJSON()
      : message;

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

    senderId:
      data.senderId?.toString?.() ||
      data.senderId,

    receiverId:
      data.receiverId?.toString?.() ||
      data.receiverId,

    timestamp:
      data.timestamp ||
      data.createdAt ||
      new Date().toISOString(),
  };
};

/* ============================================================
   GET MESSAGES
   GET /api/messages?patientId=xxxxx
============================================================ */

export const getMessages = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      sender,
      isRead,
      limit = 100,
    } = req.query;

    /* --------------------------------------------------------
       QUERY
    -------------------------------------------------------- */

    const query = {};

    /* Patient filter */

    if (patientId) {
      if (!isValidObjectId(patientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid patientId",
        });
      }

      query.patientId = patientId;
    }

    /* Doctor filter */

    if (doctorId) {
      if (!isValidObjectId(doctorId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid doctorId",
        });
      }

      query.doctorId = doctorId;
    }

    /* Sender filter */

    if (sender) {
      const normalizedSender = String(sender).toLowerCase();

      if (!["patient", "doctor"].includes(normalizedSender)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid sender. Sender must be patient or doctor.",
        });
      }

      query.sender = normalizedSender;
    }

    /* Read / unread filter */

    if (typeof isRead !== "undefined") {
      query.isRead =
        String(isRead).toLowerCase() === "true";
    }

    /* --------------------------------------------------------
       LIMIT
    -------------------------------------------------------- */

    const safeLimit = Math.min(
      Math.max(Number(limit) || 100, 1),
      500,
    );

    /* --------------------------------------------------------
       DATABASE QUERY
    -------------------------------------------------------- */

    const messages = await Message.find(query)
      .sort({
        createdAt: 1,
      })
      .limit(safeLimit)
      .lean();

    /* --------------------------------------------------------
       RESPONSE
    -------------------------------------------------------- */

    const formattedMessages = messages.map(
      formatMessage,
    );

    return res.status(200).json({
      success: true,
      count: formattedMessages.length,
      data: formattedMessages,
    });
  } catch (error) {
    console.error(
      "❌ FETCH MESSAGES ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   CREATE MESSAGE
   POST /api/messages
============================================================ */

export const createMessage = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      sender,
      senderId,
      receiverId,
      text,
      message,
      isRead,
      messageType,
      attachmentUrl,
    } = req.body;

    /* --------------------------------------------------------
       ACCEPT BOTH:
       
       text
       message
       
       This makes the API compatible with your existing
       frontend chat code.
    -------------------------------------------------------- */

    const messageText =
      typeof text === "string"
        ? text.trim()
        : typeof message === "string"
          ? message.trim()
          : "";

    /* --------------------------------------------------------
       VALIDATION
    -------------------------------------------------------- */

    if (!patientId) {
      return res.status(400).json({
        success: false,
        message: "patientId is required",
      });
    }

    if (!isValidObjectId(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patientId",
      });
    }

    if (doctorId && !isValidObjectId(doctorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid doctorId",
      });
    }

    if (!sender) {
      return res.status(400).json({
        success: false,
        message: "sender is required",
      });
    }

    const normalizedSender =
      String(sender).toLowerCase().trim();

    if (
      !["patient", "doctor"].includes(
        normalizedSender,
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "sender must be either patient or doctor",
      });
    }

    if (!messageText) {
      return res.status(400).json({
        success: false,
        message: "Message text is required",
      });
    }

    /* --------------------------------------------------------
       CREATE
    -------------------------------------------------------- */

    const newMessage = await Message.create({
      patientId,
      doctorId:
        doctorId || undefined,

      sender: normalizedSender,

      senderId:
        senderId &&
        isValidObjectId(senderId)
          ? senderId
          : undefined,

      receiverId:
        receiverId &&
        isValidObjectId(receiverId)
          ? receiverId
          : undefined,

      text: messageText,

      isRead:
        typeof isRead === "boolean"
          ? isRead
          : false,

      messageType:
        messageType || "text",

      attachmentUrl:
        attachmentUrl || "",
    });

    /* --------------------------------------------------------
       RESPONSE
    -------------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: formatMessage(newMessage),
    });
  } catch (error) {
    console.error(
      "❌ CREATE MESSAGE ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create message",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   UPDATE MESSAGE
   PUT /api/messages/:id
============================================================ */

export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    /* --------------------------------------------------------
       ONLY ALLOW SAFE FIELDS TO UPDATE
    -------------------------------------------------------- */

    const updateData = {};

    if (
      typeof req.body.text === "string"
    ) {
      updateData.text =
        req.body.text.trim();
    }

    if (
      typeof req.body.isRead === "boolean"
    ) {
      updateData.isRead =
        req.body.isRead;
    }

    if (
      typeof req.body.messageType === "string"
    ) {
      updateData.messageType =
        req.body.messageType;
    }

    if (
      typeof req.body.attachmentUrl ===
        "string"
    ) {
      updateData.attachmentUrl =
        req.body.attachmentUrl;
    }

    /* --------------------------------------------------------
       BACKWARD COMPATIBILITY
       
       If frontend sends:
       { message: "Hello" }
       
       convert it to text.
    -------------------------------------------------------- */

    if (
      !updateData.text &&
      typeof req.body.message === "string"
    ) {
      updateData.text =
        req.body.message.trim();
    }

    if (
      Object.keys(updateData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    /* --------------------------------------------------------
       UPDATE
    -------------------------------------------------------- */

    const updatedMessage =
      await Message.findByIdAndUpdate(
        id,
        {
          $set: updateData,
        },
        {
          new: true,
          runValidators: true,
        },
      );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    /* --------------------------------------------------------
       RESPONSE
    -------------------------------------------------------- */

    return res.status(200).json({
      success: true,
      message:
        "Message updated successfully",
      data: formatMessage(
        updatedMessage,
      ),
    });
  } catch (error) {
    console.error(
      "❌ UPDATE MESSAGE ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update message",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/* ============================================================
   DELETE MESSAGE
   DELETE /api/messages/:id
============================================================ */

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const deletedMessage =
      await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Message deleted successfully",
      data: formatMessage(
        deletedMessage,
      ),
    });
  } catch (error) {
    console.error(
      "❌ DELETE MESSAGE ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};