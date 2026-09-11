
// ============================================================
// MMCare AI Hospital
// Doctor Seed Data
// ============================================================
//
// Purpose:
// - Temporary source data for migrating doctors to MongoDB.
// - This file replaces the doctors section of db.json.
// - Passwords must be hashed before saving to MongoDB.
// - Do NOT return password fields from API responses.
//
// ============================================================

const doctorSeedData = [
  // ==========================================================
  // DOCTOR 1001
  // ==========================================================
  {
    id: "DOC-1001",
    FullName: "Dr. Anjali Sharma",
    email: "AnjaliSharma@gmail.com",
    password: "Anjali@123",

    disease: "Heart Disease",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor2.png",

    gender: "female",
    dob: "1978-08-02",
    bloodGroup: "B+",
    qualification: "MBBS",
    experience: "10",

    city: "Mumbai",
    phone: "9767656465",
    state: "Maharashtra",

    availableTime: "10 AM To 7 PM",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Heart specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1002
  // ==========================================================
  {
    id: "DOC-1002",
    FullName: "Dr. Rajesh Kumar",
    email: "RajeshKumar@gmail.com",
    password: "Rajesh@123",

    disease: "Diabetes",
    department: "Endocrinology",
    specialization: "Diabetologist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor1.png",

    gender: "Male",
    dob: "1975-08-27",
    bloodGroup: "AB+",
    qualification: "MBBS, MD",
    experience: 10,

    city: "Pune",
    phone: "9878665665",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Diabetes specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1003
  // ==========================================================
  {
    id: "DOC-1003",
    FullName: "Dr. Priya Patel",
    email: "PriyaPatel@gmail.com",
    password: "Priya@123",

    disease: "Asthma",
    department: "Pulmonology",
    specialization: "Respiratory Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor5.png",

    gender: "female",
    dob: "1980-05-07",
    bloodGroup: "B+",
    qualification: "MBBS, MD",
    experience: "8",

    city: "Mumbai",
    phone: "9787655445",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Asthma specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1004
  // ==========================================================
  {
    id: "DOC-1004",
    FullName: "Dr. Michael Johnson",
    email: "Michaeljohnson@gmail.com",
    password: "Michael@123",

    disease: "High Blood Pressure",
    department: "Internal Medicine",
    specialization: "General Physician",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor3.png",

    gender: "Male",
    dob: "1980-05-17",
    bloodGroup: "O+",
    qualification: "MBBS",
    experience: "12",

    city: "Pune",
    phone: "9676554564",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "High Blood specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1005
  // ==========================================================
  {
    id: "DOC-1005",
    FullName: "Dr. Sarah White",
    email: "SarahWhite@gmail.com",
    password: "Sarah@123",

    disease: "Breast Cancer",
    department: "Oncology",
    specialization: "Medical Oncologist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor6.png",

    gender: "female",
    dob: "1975-06-27",
    bloodGroup: "AB-",
    qualification: "MBBS, MD",
    experience: "12",

    city: "Delhi",
    phone: "7686644343",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1006
  // ==========================================================
  {
    id: "DOC-1006",
    FullName: "Dr. Ahmed Khan",
    email: "AhmedKhan@gmail.com",
    password: "Ahmed@123",

    disease: "Kidney Stones",
    department: "Nephrology",
    specialization: "Kidney Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor4.png",

    gender: "Male",
    dob: "1990-12-07",
    bloodGroup: "B-",
    qualification: "MBBS",
    experience: "5",

    city: "Ahmedabad",
    phone: "8767654544",
    state: "Gujarat",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Kidney Stones specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1007
  // ==========================================================
  {
    id: "DOC-1007",
    FullName: "Dr. Emily Clarke",
    email: "EmilyClarke@gmail.com",
    password: "Emily@123",

    disease: "Arthritis",
    department: "Rheumatology",
    specialization: "Joint Disease Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor7.png",

    gender: "female",
    dob: "1978-09-02",
    bloodGroup: "A+",
    qualification: "MBBS",
    experience: "10",

    city: "Mumbai",
    phone: "9676765654",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Arthritis specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1008
  // ==========================================================
  {
    id: "DOC-1008",
    FullName: "Dr. David Sung",
    email: "Davidsung@gmail.com",
    password: "David@123",

    disease: "Back Pain",
    department: "Orthopedics",
    specialization: "Spine Surgeon",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor10.png",

    gender: "Male",
    dob: "1975-09-17",
    bloodGroup: "A+",
    qualification: "MBBS, MD",
    experience: "13",

    city: "Mumbai",
    phone: "9898767554",
    state: "Maharashtra",

    availableTime: "10 AM To 7 PM",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Back Pain specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1009
  // ==========================================================
  {
    id: "DOC-1009",
    FullName: "Dr. Sophia Lewis",
    email: "Sophialewis@gmail.com",
    password: "Sophia@123",

    disease: "Anxiety Disorder",
    department: "Psychiatry",
    specialization: "Mental Health Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor9.png",

    gender: "female",
    dob: "1990-11-27",
    bloodGroup: "O-",
    qualification: "MBBS",
    experience: "10",

    city: "Delhi",
    phone: "9787654342",
    state: "Delhi",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Anxiety Disorder specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1010
  // ==========================================================
  {
    id: "DOC-1010",
    FullName: "Dr. James Wilson",
    email: "Jameswilson@gmail.com",
    password: "James@123",

    disease: "Migraine",
    department: "Neurology",
    specialization: "Brain & Nerve Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1980-05-24",
    bloodGroup: "B+",
    qualification: "MBBS",
    experience: "10",

    city: "Mumbai",
    phone: "9786756556",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Migraine specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1011
  // ==========================================================
  {
    id: "DOC-1011",
    FullName: "Dr. Aarav Mehta",
    email: "Aaravmehta@gmail.com",
    password: "Aarav@123",

    disease: "Chest Pain",
    department: "Cardiology",
    specialization: "Interventional Cardiologist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1993-12-27",
    bloodGroup: "AB+",
    qualification: "MBBS",
    experience: "08",

    city: "Ahmedabad",
    phone: "9755454441",
    state: "Gujarat",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Chest specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1012
  // ==========================================================
  {
    id: "DOC-1012",
    FullName: "Dr. Kavya Reddy",
    email: "Kavyareddy@gmail.com",
    password: "Kavya@123",

    disease: "Heart Problem",
    department: "Cardiology",
    specialization: "Heart Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor8.png",

    gender: "female",
    dob: "1987-05-24",
    bloodGroup: "AB+",
    qualification: "MBBS, MD",
    experience: "10",

    city: "Delhi",
    phone: "9889776645",
    state: "Delhi",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Heart specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1013
  // ==========================================================
  {
    id: "DOC-1013",
    FullName: "Dr. Rohan Deshmukh",
    email: "Rohandeshmukh@gmail.com",
    password: "Rohan@123",

    disease: "Skin Allergy",
    department: "Dermatology",
    specialization: "Skin Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1991-05-17",
    bloodGroup: "O+",
    qualification: "MBBS",
    experience: "09",

    city: "Ahmedabad",
    phone: "9708877453",
    state: "Gujarat",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Skin Allergy specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1014
  // ==========================================================
  {
    id: "DOC-1014",
    FullName: "Dr. Neha Kapoor",
    email: "Nehakapoor@gmail.com",
    password: "Neha@123",

    disease: "Rash",
    department: "Dermatology",
    specialization: "Dermatologist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "/AIDoctors/doctor11.png",

    gender: "female",
    dob: "1990-10-27",
    bloodGroup: "B+",
    qualification: "MBBS",
    experience: "05",

    city: "Pune",
    phone: "8997676554",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Rash specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1015
  // ==========================================================
  {
    id: "DOC-1015",
    FullName: "Dr. Vikram Singh",
    email: "VikramSingh@gmail.com",
    password: "Vikram@123",

    disease: "Fever",
    department: "General Medicine",
    specialization: "Internal Medicine Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1990-05-27",
    bloodGroup: "AB+",
    qualification: "MBBS, MD",
    experience: "02",

    city: "Delhi",
    phone: "9778765654",
    state: "Delhi",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Fever specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1016
  // ==========================================================
  {
    id: "DOC-1016",
    FullName: "Dr. Pooja Nair",
    email: "Poojabair@gmail.com",
    password: "Pooja@123",

    disease: "Cold",
    department: "General Medicine",
    specialization: "Family Physician",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "female",
    dob: "1992-08-27",
    bloodGroup: "AB-",
    qualification: "MBBS",
    experience: "05",

    city: "Mumbai",
    phone: "9776655644",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Cold specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1017
  // ==========================================================
  {
    id: "DOC-1017",
    FullName: "Dr. Arjun Patel",
    email: "Arjunpatel@gmail.com",
    password: "Arjun@123",

    disease: "Headache",
    department: "Neurology",
    specialization: "Brain & Nerve Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1990-05-17",
    bloodGroup: "O+",
    qualification: "MBBS, MD",
    experience: "05",

    city: "Mumbai",
    phone: "9788765454",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Headache specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1018
  // ==========================================================
  {
    id: "DOC-1018",
    FullName: "Dr. Sneha Joshi",
    email: "Snehajoshi@gmail.com",
    password: "Sneha@123",

    disease: "Back Pain",
    department: "Orthopedics",
    specialization: "Spine & Bone Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "female",
    dob: "1995-05-17",
    bloodGroup: "B+",
    qualification: "MBBS",
    experience: "02",

    city: "Ahmedabad",
    phone: "9786756443",
    state: "Gujarat",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Back Pain specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1019
  // ==========================================================
  {
    id: "DOC-1019",
    FullName: "Dr. Aditya Malhotra",
    email: "Adityamalhotra@gmail.com",
    password: "Aditya@123",

    disease: "Anxiety",
    department: "Psychiatry",
    specialization: "Mental Health Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "Male",
    dob: "1980-05-17",
    bloodGroup: "A+",
    qualification: "MBBS, MD",
    experience: "10",

    city: "Delhi",
    phone: "9880775654",
    state: "Delhi",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Anxiety specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },

  // ==========================================================
  // DOCTOR 1020
  // ==========================================================
  {
    id: "DOC-1020",
    FullName: "Dr. Meera Iyer",
    email: "Meeraiyer@gmail.com",
    password: "Meera@123",

    disease: "Asthma",
    department: "Pulmonology",
    specialization: "Lung Specialist",

    morningSlot: {
      start: "10:00",
      end: "14:00",
    },

    eveningSlot: {
      start: "15:00",
      end: "19:00",
    },

    profilePhoto: "",

    gender: "female",
    dob: "1993-07-17",
    bloodGroup: "A-",
    qualification: "MBBS",
    experience: "04",

    city: "Pune",
    phone: "9978655433",
    state: "Maharashtra",

    availableDays: "Mon-Sat",

    consultationMode: "Online & Offline",
    consultationFee: 500,
    followUpFee: 300,

    bio: "Asthma specialist",
    languages: "Marathi, Hindi, English",

    totalPatients: 1200,
    totalAppointments: 3000,
    rating: 4.8,

    status: "Active",
  },
];

export default doctorSeedData;
