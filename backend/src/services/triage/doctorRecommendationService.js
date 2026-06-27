import { doctors } from "../../data/triage/doctorMockData.js";

export const getRecommendedDoctors = (department, specialization) => {
  const dept = (department || "").toLowerCase();
  const spec = (specialization || "").toLowerCase();

  const filtered = doctors.filter((doctor) => {
    const doctorDepartment = doctor.department.toLowerCase();
    const doctorSpec = doctor.specialization.toLowerCase();

    return (
      doctorDepartment.includes(dept) ||
      doctorSpec.includes(spec) ||
      dept.includes(doctorDepartment) ||
      spec.includes(doctorSpec)
    );
  });

  return filtered.slice(0, 3);
};
