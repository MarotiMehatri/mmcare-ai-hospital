import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  FaBell,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../Styles/Patient/patientNavbar.css";

import { getNotifications } from "../services/Patient/notificationAPI";
import { getUserById } from "../api/UserAPI";
import { getMessages } from "../services/Patient/messageAPI";
import { getPatientByUserId } from "../services/Patient/PatientAPI";


function PatientNavbar() {
  const navigate = useNavigate();

  // =========================================================
  // STATES
  // =========================================================

  const [user, setUser] = useState(null);

  const [patient, setPatient] = useState(null);

  const [notifications, setNotifications] = useState([]);

  const [messages, setMessages] = useState([]);

  const [dropdown, setDropdown] = useState(false);

  const [messageDropdown, setMessageDropdown] = useState(false);

  const [notificationDropdown, setNotificationDropdown] =
    useState(false);

  // =========================================================
  // HELPERS
  // =========================================================

  const getId = useCallback((data) => {
    if (!data) {
      return null;
    }

    return (
      data._id ||
      data.id ||
      data.userId ||
      null
    );
  }, []);

  const normalizeId = useCallback((id) => {
    if (!id) {
      return null;
    }

    return String(id);
  }, []);

  const getApiData = useCallback((response) => {
    return (
      response?.data?.data ??
      response?.data ??
      response ??
      null
    );
  }, []);

  // =========================================================
  // GET STORED USER
  // =========================================================

  const getStoredUser = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);
    } catch (error) {
      console.error(
        "PatientNavbar: Failed to parse stored user:",
        error
      );

      return null;
    }
  }, []);

  // =========================================================
  // GET STORED USER ID
  // =========================================================

  const getStoredUserId = useCallback(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      return null;
    }

    const userId =
      storedUser?._id ||
      storedUser?.id ||
      storedUser?.userId ||
      localStorage.getItem("userId") ||
      localStorage.getItem("userMongoId");

    return normalizeId(userId);
  }, [getStoredUser, normalizeId]);

  // =========================================================
  // LOAD USER
  // =========================================================

  const loadUser = useCallback(
    async (userId) => {
      try {
        if (!userId) {
          console.error(
            "PatientNavbar: loadUser called without userId."
          );

          return null;
        }

        const normalizedUserId =
          normalizeId(userId);

        console.log(
          "PatientNavbar: Loading user:",
          normalizedUserId
        );

        const response =
          await getUserById(normalizedUserId);

        console.log(
          "PatientNavbar: User API response:",
          response
        );

        const userData =
          getApiData(response);

        if (!userData) {
          console.warn(
            "PatientNavbar: User API returned empty data."
          );

          return null;
        }

        const resolvedUserId =
          normalizeId(
            userData?._id ||
            userData?.id ||
            normalizedUserId
          );

        const normalizedUser = {
          ...userData,

          _id: resolvedUserId,

          id: resolvedUserId,
        };

        // ---------------------------------------------------
        // SAVE USER
        // ---------------------------------------------------

        localStorage.setItem(
          "user",
          JSON.stringify(normalizedUser)
        );

        localStorage.setItem(
          "userId",
          resolvedUserId
        );

        localStorage.setItem(
          "userMongoId",
          resolvedUserId
        );

        console.log(
          "PatientNavbar: Normalized user:",
          normalizedUser
        );

        return normalizedUser;
      } catch (error) {
        console.error(
          "PatientNavbar: User API Error:",
          error
        );

        return null;
      }
    },
    [getApiData, normalizeId]
  );

  // =========================================================
  // LOAD PATIENT
  // =========================================================

  const loadPatient = useCallback(
    async (userId) => {
      try {
        if (!userId) {
          console.error(
            "PatientNavbar: loadPatient called without userId."
          );

          return null;
        }

        const normalizedUserId =
          normalizeId(userId);

        console.log(
          "PatientNavbar: Loading patient using userId:",
          normalizedUserId
        );

        const response =
          await getPatientByUserId(
            normalizedUserId
          );

        console.log(
          "PatientNavbar: Patient API response:",
          response
        );

        const patientData =
          getApiData(response);

        if (
          !patientData ||
          patientData === null
        ) {
          console.warn(
            "PatientNavbar: Patient profile not found:",
            normalizedUserId
          );

          setPatient(null);

          localStorage.removeItem(
            "patient"
          );

          localStorage.removeItem(
            "patientId"
          );

          localStorage.removeItem(
            "patientMongoId"
          );

          return null;
        }

        const resolvedPatientId =
          normalizeId(
            patientData?._id ||
            patientData?.id
          );

        const normalizedPatient = {
          ...patientData,

          ...(resolvedPatientId
            ? {
              _id: resolvedPatientId,
              id: resolvedPatientId,
            }
            : {}),

          userId:
            patientData?.userId ||
            normalizedUserId,
        };

        console.log(
          "PatientNavbar: Normalized patient:",
          normalizedPatient
        );

        // ---------------------------------------------------
        // SAVE PATIENT
        // ---------------------------------------------------

        setPatient(
          normalizedPatient
        );

        localStorage.setItem(
          "patient",
          JSON.stringify(
            normalizedPatient
          )
        );

        if (resolvedPatientId) {
          localStorage.setItem(
            "patientId",
            resolvedPatientId
          );

          localStorage.setItem(
            "patientMongoId",
            resolvedPatientId
          );
        }

        return normalizedPatient;
      } catch (error) {
        console.error(
          "PatientNavbar: Patient API Error:",
          error
        );

        setPatient(null);

        return null;
      }
    },
    [getApiData, normalizeId]
  );

  // =========================================================
  // LOAD NOTIFICATIONS
  // =========================================================

  const loadNotifications = useCallback(
    async (patientId) => {
      try {
        if (!patientId) {
          return;
        }

        const normalizedPatientId =
          normalizeId(patientId);

        const response =
          await getNotifications(
            normalizedPatientId
          );

        console.log(
          "PatientNavbar: Notifications response:",
          response
        );

        const data =
          getApiData(response);

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error(
          "PatientNavbar: Notification API Error:",
          error
        );

        // Do not destroy existing notifications
        // if polling/API temporarily fails.
      }
    },
    [getApiData, normalizeId]
  );

  // =========================================================
  // LOAD MESSAGES
  // =========================================================

  const loadMessages = useCallback(
    async (patientId) => {
      try {
        if (!patientId) {
          return;
        }

        const normalizedPatientId =
          normalizeId(patientId);

        const response =
          await getMessages(
            normalizedPatientId
          );

        console.log(
          "PatientNavbar: Messages response:",
          response
        );

        const data =
          getApiData(response);

        if (!Array.isArray(data)) {
          setMessages([]);
          return;
        }

        // ---------------------------------------------------
        // DOCTOR MESSAGES ONLY
        // ---------------------------------------------------

        const doctorMessages =
          data.filter((message) => {
            const sender =
              String(
                message?.sender || ""
              )
                .trim()
                .toLowerCase();

            return sender === "doctor";
          });

        setMessages(
          doctorMessages
        );
      } catch (error) {
        console.error(
          "PatientNavbar: Message API Error:",
          error
        );

        // Keep existing messages if API temporarily fails.
      }
    },
    [getApiData, normalizeId]
  );

  // =========================================================
  // INITIALIZE USER
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const initializeUser = async () => {
      try {
        const storedUser =
          getStoredUser();

        // ---------------------------------------------------
        // NO USER
        // ---------------------------------------------------

        if (!storedUser) {
          console.warn(
            "PatientNavbar: No logged-in user."
          );

          if (mounted) {
            navigate(
              "/login",
              {
                replace: true,
              }
            );
          }

          return;
        }

        // ---------------------------------------------------
        // ROLE CHECK
        // ---------------------------------------------------

        const role =
          String(
            storedUser?.role || ""
          )
            .trim()
            .toLowerCase();

        if (
          role &&
          role !== "patient"
        ) {
          console.warn(
            "PatientNavbar: Invalid user role:",
            role
          );

          if (mounted) {
            navigate(
              "/login",
              {
                replace: true,
              }
            );
          }

          return;
        }

        // ---------------------------------------------------
        // GET USER ID
        // ---------------------------------------------------

        const userId =
          getStoredUserId();

        console.log(
          "PatientNavbar: Stored user:",
          storedUser
        );

        console.log(
          "PatientNavbar: Resolved user ID:",
          userId
        );

        if (!userId) {
          console.error(
            "PatientNavbar: User ID not found."
          );

          localStorage.removeItem(
            "user"
          );

          localStorage.removeItem(
            "userId"
          );

          localStorage.removeItem(
            "userMongoId"
          );

          if (mounted) {
            navigate(
              "/login",
              {
                replace: true,
              }
            );
          }

          return;
        }

        // ---------------------------------------------------
        // LOAD USER
        // ---------------------------------------------------

        const userData =
          await loadUser(userId);

        if (
          mounted &&
          userData
        ) {
          setUser(userData);
        }
      } catch (error) {
        console.error(
          "PatientNavbar: Initialization error:",
          error
        );
      }
    };

    initializeUser();

    return () => {
      mounted = false;
    };
  }, [
    getStoredUser,
    getStoredUserId,
    loadUser,
    navigate,
  ]);

  // =========================================================
  // LOAD PATIENT WHEN USER CHANGES
  // =========================================================

  useEffect(() => {
    const userId =
      user?._id ||
      user?.id ||
      user?.userId;

    if (!userId) {
      return;
    }

    loadPatient(
      String(userId)
    );
  }, [
    user,
    loadPatient,
  ]);

  // =========================================================
  // LOAD NOTIFICATIONS + MESSAGES
  // =========================================================

  useEffect(() => {
    const patientId =
      patient?._id ||
      patient?.id;

    if (!patientId) {
      return;
    }

    const normalizedPatientId =
      String(patientId);

    // -------------------------------------------------------
    // INITIAL LOAD
    // -------------------------------------------------------

    loadNotifications(
      normalizedPatientId
    );

    loadMessages(
      normalizedPatientId
    );

    // -------------------------------------------------------
    // POLLING
    // -------------------------------------------------------

    const interval =
      setInterval(() => {
        loadNotifications(
          normalizedPatientId
        );

        loadMessages(
          normalizedPatientId
        );
      }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [
    patient,
    loadNotifications,
    loadMessages,
  ]);

  // =========================================================
  // PROFILE
  // =========================================================

  const handleProfile = () => {
    const patientId =
      patient?._id ||
      patient?.id ||
      localStorage.getItem(
        "patientId"
      );

    if (!patientId) {
      console.error(
        "PatientNavbar: Patient ID not found."
      );

      return;
    }

    setDropdown(false);

    navigate(
      `/patient/profile/${patientId}`
    );
  };

  // =========================================================
  // OPEN CHAT
  // =========================================================

  const handleOpenChat = () => {
    setMessageDropdown(false);

    navigate(
      "/patient/patient-chat"
    );
  };

  // =========================================================
  // NOTIFICATION CLICK
  // =========================================================

  const handleNotificationClick = (
    notification
  ) => {
    setNotificationDropdown(
      false
    );

    if (
      notification?.link
    ) {
      navigate(
        notification.link
      );

      return;
    }

    // Default notification destination
    navigate(
      "/patient"
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    console.log(
      "PatientNavbar: Logging out..."
    );

    const authKeys = [
      "token",
      "accessToken",
      "refreshToken",
      "user",
      "userId",
      "userMongoId",
      "userLegacyId",
      "patient",
      "patientId",
      "patientMongoId",
    ];

    authKeys.forEach(
      (key) => {
        localStorage.removeItem(
          key
        );
      }
    );

    setUser(null);
    setPatient(null);
    setNotifications([]);
    setMessages([]);
    setDropdown(false);
    setMessageDropdown(false);
    setNotificationDropdown(false);

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    patient?.photo &&
      typeof patient.photo ===
      "string" &&
      patient.photo.trim() !== ""
      ? patient.photo
      : null;

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    user?.fullName ||
    user?.name ||
    patient?.fullName ||
    patient?.name ||
    "Patient";

  // =========================================================
  // UNREAD MESSAGES
  // =========================================================

  const unreadMessages =
    useMemo(() => {
      return messages.filter(
        (message) =>
          message?.isRead !== true
      ).length;
    }, [messages]);

  // =========================================================
  // UNREAD NOTIFICATIONS
  // =========================================================

  const unreadNotifications =
    useMemo(() => {
      return notifications.filter(
        (notification) =>
          notification?.isRead !== true
      ).length;
    }, [notifications]);

  // =========================================================
  // RECENT MESSAGES
  // =========================================================

  const recentMessages =
    useMemo(() => {
      return messages
        .slice()
        .sort((a, b) => {
          const dateA = new Date(
            a?.createdAt ||
            a?.timestamp ||
            0
          ).getTime();

          const dateB = new Date(
            b?.createdAt ||
            b?.timestamp ||
            0
          ).getTime();

          return dateB - dateA;
        })
        .slice(0, 5);
    }, [messages]);

  // =========================================================
  // RECENT NOTIFICATIONS
  // =========================================================

  const recentNotifications =
    useMemo(() => {
      return notifications
        .slice()
        .sort((a, b) => {
          const dateA = new Date(
            a?.createdAt ||
            a?.timestamp ||
            0
          ).getTime();

          const dateB = new Date(
            b?.createdAt ||
            b?.timestamp ||
            0
          ).getTime();

          return dateB - dateA;
        })
        .slice(0, 5);
    }, [notifications]);

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (
    dateValue
  ) => {
    if (!dateValue) {
      return "";
    }

    const date =
      new Date(dateValue);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <header className="patient-navbar">

      {/* =================================================
          LEFT
      ================================================= */}

      <div className="navbar-left">

        <div
          className="navbar-logo"
          onClick={() =>
            navigate("/patient")
          }
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              navigate("/patient");
            }
          }}
        >
          MMCare-AI
        </div>

      </div>

      {/* =================================================
          RIGHT
      ================================================= */}

      <div className="navbar-right">

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div className="notification-wrapper">

          <div
            className="nav-icon"
            onClick={() =>
              setNotificationDropdown(
                (previous) =>
                  !previous
              )
            }
            role="button"
            tabIndex={0}
          >

            <FaBell />

            {unreadNotifications >
              0 && (
                <span className="badge">
                  {unreadNotifications}
                </span>
              )}

          </div>

          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================= */}

          {notificationDropdown && (
            <div className="notification-dropdown">

              <div className="notification-header">
                <span>
                  Notifications
                </span>

                {notifications.length >
                  0 && (
                    <span>
                      {notifications.length}
                    </span>
                  )}
              </div>

              {recentNotifications.length ===
                0 ? (
                <div className="no-notification">
                  No Notifications Found
                </div>
              ) : (
                recentNotifications.map(
                  (
                    notification,
                    index
                  ) => (
                    <div
                      className={`notification-item ${notification?.isRead
                        ? ""
                        : "unread"
                        }`}
                      key={
                        notification?._id ||
                        notification?.id ||
                        index
                      }
                      onClick={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                    >

                      <div className="notification-title">
                        {notification?.title ||
                          "Notification"}
                      </div>

                      <div className="notification-message">
                        {notification?.message ||
                          "You have a new notification."}
                      </div>

                      <div className="notification-time">
                        {formatTime(
                          notification?.createdAt ||
                          notification?.timestamp
                        )}
                      </div>

                    </div>
                  )
                )
              )}

            </div>
          )}

        </div>

        {/* =================================================
            MESSAGES
        ================================================= */}

        <div className="message-alert-wrapper">

          <div
            className="nav-icon"
            onClick={() =>
              setMessageDropdown(
                (previous) =>
                  !previous
              )
            }
            role="button"
            tabIndex={0}
          >

            <FaEnvelope />

            {unreadMessages >
              0 && (
                <span className="badge">
                  {unreadMessages}
                </span>
              )}

          </div>

          {/* =================================================
              MESSAGE DROPDOWN
          ================================================= */}

          {messageDropdown && (
            <div className="message-dropdown">

              <div className="message-header">
                Doctor Messages
              </div>

              {recentMessages.length ===
                0 ? (
                <div className="no-message">
                  No Messages Found
                </div>
              ) : (
                recentMessages.map(
                  (
                    message,
                    index
                  ) => (
                    <div
                      className="message-item"
                      key={
                        message?._id ||
                        message?.id ||
                        index
                      }
                    >

                      <div className="message-top">

                        <h4>
                          {message?.doctorName ||
                            message?.FullName ||
                            message?.fullName ||
                            "Doctor"}
                        </h4>

                        <span>
                          {formatTime(
                            message?.createdAt ||
                            message?.timestamp
                          )}
                        </span>

                      </div>

                      <p>
                        {message?.text ||
                          message?.message ||
                          "New message"}
                      </p>

                    </div>
                  )
                )
              )}

              <button
                type="button"
                className="view-all-btn"
                onClick={
                  handleOpenChat
                }
              >
                Open Chat
              </button>

            </div>
          )}

        </div>

        {/* =================================================
            SUPPORT
        ================================================= */}

        <div className="nav-support">
          24/7 Support
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="nav-profile"
          onClick={() =>
            setDropdown(
              (previous) =>
                !previous
            )
          }
          role="button"
          tabIndex={0}
        >

          {profileImage ? (
            <img
              src={profileImage}
              alt="Patient profile"
              className="profile-img"
            />
          ) : (
            <FaUserCircle
              size={32}
            />
          )}

          <span>
            {displayName}
          </span>

        </div>

        {/* =================================================
            PROFILE DROPDOWN
        ================================================= */}

        {dropdown && (
          <div className="profile-dropdown">

            <div
              onClick={
                handleProfile
              }
              role="button"
              tabIndex={0}
            >
              My Profile
            </div>

            <div
              onClick={() => {
                setDropdown(false);

                navigate(
                  "/patient/settings"
                );
              }}
              role="button"
              tabIndex={0}
            >
              Settings
            </div>

            <div
              className="logout"
              onClick={
                handleLogout
              }
              role="button"
              tabIndex={0}
            >
              Logout
            </div>

          </div>
        )}

      </div>

    </header>
  );
}

export default PatientNavbar;