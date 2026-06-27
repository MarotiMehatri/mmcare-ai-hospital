import React from "react";
import "../../Styles/Patient/BookAppointmentForm.css";

function BookAppointmentForm({
  form,
  selectedDoctor,
  onChange,
  onSubmit,
  loading,
}) {
  const generateTimeSlots = (doctor) => {
    if (!doctor) return [];

    if (doctor.timeSlots && Array.isArray(doctor.timeSlots)) {
      return doctor.timeSlots;
    }

    const slots = [];

    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 || 12;
      const formattedMinutes = String(minutes).padStart(2, "0");

      return `${formattedHour}:${formattedMinutes} ${ampm}`;
    };

    const addSlotsFromRange = (range) => {
      if (!range?.start || !range?.end) return;

      const [startHour, startMinute] = range.start.split(":").map(Number);
      const [endHour, endMinute] = range.end.split(":").map(Number);

      const start = new Date();
      start.setHours(startHour, startMinute, 0, 0);

      const end = new Date();
      end.setHours(endHour, endMinute, 0, 0);

      while (start < end) {
        slots.push(formatTime(start));
        start.setMinutes(start.getMinutes() + 60);
      }
    };

    addSlotsFromRange(doctor.morningSlot);
    addSlotsFromRange(doctor.eveningSlot);

    return slots;
  };

  const availableSlots = generateTimeSlots(selectedDoctor);

  return (
    <form className="book-appointment-form" onSubmit={onSubmit}>
      <div className="book-appointment-form__grid">
        <div className="form-group">
          <label>Patient Name</label>
          <input
            name="patientName"
            value={form.patientName || ""}
            onChange={onChange}
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="form-group">
          <label>Doctor Name</label>
          <input
            value={
              selectedDoctor?.FullName ||
              selectedDoctor?.name ||
              selectedDoctor?.doctorName ||
              ""
            }
            placeholder="Select doctor"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            value={selectedDoctor?.department || ""}
            placeholder="Doctor department"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Specialization</label>
          <input
            value={selectedDoctor?.specialization || ""}
            placeholder="Doctor specialization"
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Disease / Problem</label>
          <input
            name="disease"
            value={form.disease || ""}
            onChange={onChange}
            placeholder="Enter disease or problem"
            required
          />
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate || ""}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Appointment Time</label>
          <select
            name="appointmentTime"
            value={form.appointmentTime || ""}
            onChange={onChange}
            required
            disabled={!selectedDoctor}
          >
            <option value="">
              {selectedDoctor ? "Select Time Slot" : "Select Doctor First"}
            </option>

            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <option value={slot} key={slot}>
                  {slot}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No time slots available
              </option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Visit Type</label>
          <select
            name="visitType"
            value={form.visitType || ""}
            onChange={onChange}
            required
          >
            <option value="">Select Visit Type</option>
            <option value="Hospital Visit">Hospital Visit</option>
            <option value="Online Consultation">Online Consultation</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Notes</label>
          <textarea
            name="notes"
            value={form.notes || ""}
            onChange={onChange}
            placeholder="Add patient notes"
            rows="4"
          />
        </div>
      </div>

      <button
        type="submit"
        className="book-appointment-form__submit"
        disabled={loading || !selectedDoctor}
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </form>
  );
}

export default BookAppointmentForm;
