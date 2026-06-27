import doctors from "../data/doctorsData";

//Get All Doctors
export const getAllDoctors = () => {
  return doctors;
};

//Get Doctor By Disease
export const getDoctorByDisease = (diseaseName) => {
  return doctors.find(
    (doc) => doc.disease.toLowerCase() === diseaseName.toLowerCase(),
  );
};
