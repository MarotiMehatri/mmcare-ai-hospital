import React, { useEffect, useMemo, useState } from "react";
import { getAppointmentsByDoctorId } from "../../services/Doctor/AppointmentAPI";
import "../../Styles/pages/Doctor/MyAppointments.css";
import {
  FaCalendarCheck,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaSearch,
  FaStethoscope,
  FaUserInjured,
  FaClock,
  FaHospital,
} from "react-icons/fa";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const doctor = JSON.parse(localStorage.getItem("doctor"));
        const doctorId = doctor?.id;

        if (!doctorId) {
          setLoading(false);
          return;
        }

        const res = await getAppointmentsByDoctorId(doctorId);

        // Use this if your service returns response.data directly
        setAppointments(res.data);

        // If your service returns full axios response, then use:
        // setAppointments(res.data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchSearch =
        item.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        item.reason?.toLowerCase().includes(search.toLowerCase()) ||
        item.appointmentId?.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" ? true : item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [appointments, search, statusFilter]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "status scheduled";
      case "Completed":
        return "status completed";
      case "Cancelled":
        return "status cancelled";
      case "In Consultation":
        return "status consultation";
      default:
        return "status";
    }
  };

  if (loading) {
    return <div className="appointments-loading">Loading appointments...</div>;
  }

  return (
    <div className="my-appointments-page">
      <div className="my-appointments-container">
        <div className="appointments-header">
          <div>
            <h2>My Appointments</h2>
            <p>Manage patient appointments, visit details, and status</p>
          </div>
        </div>

        <div className="appointments-filter-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by patient name, reason, appointment ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="All">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="In Consultation">In Consultation</option>
          </select>
        </div>

        <div className="appointments-grid">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item) => (
              <div className="appointment-card" key={item.id}>
                <div className="appointment-card-top">
                  <div className="patient-profile">
                    <div className="patient-photo-box">
                      {item.patientPhoto ? (
                        <img
                          src={item.patientPhoto}
                          alt={item.patientName}
                          className="patient-photo"
                        />
                      ) : (
                        <FaUserInjured className="patient-default-icon" />
                      )}
                    </div>

                    <div className="patient-main-info">
                      <h3>{item.patientName}</h3>
                      <p>
                        {item.age} Years • {item.gender}
                      </p>
                      <span className="appointment-id">
                        ID: {item.appointmentId}
                      </span>
                    </div>
                  </div>

                  <div className={getStatusClass(item.status)}>
                    {item.status}
                  </div>
                </div>

                <div className="appointment-info-grid">
                  <div className="info-row">
                    <FaCalendarCheck className="info-icon" />
                    <span>{item.appointmentDate}</span>
                  </div>

                  <div className="info-row">
                    <FaClock className="info-icon" />
                    <span>{item.appointmentTime}</span>
                  </div>

                  <div className="info-row">
                    <FaStethoscope className="info-icon" />
                    <span>{item.appointmentType}</span>
                  </div>

                  <div className="info-row">
                    <FaPhoneAlt className="info-icon" />
                    <span>{item.mobile}</span>
                  </div>

                  <div className="info-row">
                    <FaHospital className="info-icon" />
                    <span>{item.roomNumber}</span>
                  </div>

                  <div className="info-row">
                    <FaMoneyBillWave className="info-icon" />
                    <span>{item.paymentStatus}</span>
                  </div>
                </div>

                <div className="appointment-reason-box">
                  <h4>Reason</h4>
                  <p>{item.reason}</p>
                </div>

                <div className="appointment-symptoms-box">
                  <h4>Symptoms</h4>
                  <p>{item.symptoms}</p>
                </div>

                <div className="appointment-bottom">
                  <div className="checkin-box">
                    <FaClipboardCheck className="info-icon" />
                    <span>{item.checkInStatus}</span>
                  </div>

                  <div className="appointment-actions">
                    <button className="btn-primary">View</button>
                    <button className="btn-secondary">Start</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-appointments">No appointments found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
