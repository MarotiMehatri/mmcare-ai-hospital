
import mongoose from "mongoose"; 
import Doctor from "../../models/Doctor.model.js"; 

/** * Normalize doctor data 
 * Keeps the response structure compatible  
 * with the existing frontend. */ 

export const normalizeDoctor = (doctor) => {
   if (!doctor) { 
    return null; 
  } 
  const consultationMode = 
  doctor?.consultationMode ?.replace(/\s+/g, " ") 
  .trim() .toLowerCase() || ""; 
  
  return { 
    id: 
     doctor?.id || 
     doctor?.legacyId || 
     doctor?._id?.toString() || "", 
     
     mongoId: 
     doctor?._id?.toString() || "",

    fullName: 
    doctor?.FullName || 
    doctor?.fullName || 
    doctor?.name || 
    "", 
    
    email: 
    doctor?.email || "", 
    
    department: 
    doctor?.department || "", 
    
    specialization: 
    doctor?.specialization || "", 
    city: doctor?.city || "", 
    state: doctor?.state || "", 
    
    profilePhoto: 
    doctor?.profilePhoto && 
    doctor.profilePhoto.trim() !== "" ? 
    doctor.profilePhoto : "/AIDoctors/default-doctor.png", 
    consultationMode, 
    
    consultationFee: 
    Number(doctor?.consultationFee) || 0, 
    
    experience: 
    Number(doctor?.experience) || 0, 

    rating: 
    Number(doctor?.rating) || 0, 
    
    availableDays: 
    doctor?.availableDays || "", 
    
    availableTime: 
    doctor?.availableTime || "", 
    
    status: 
    doctor?.status || "Active", 
  
  }; 
}; 

/** * Get all doctors from MongoDB */ 

export const getAllDoctors = async () => { 
  
  const doctors = await Doctor.find({}) 
  .sort({ createdAt: -1, }) 
  .lean(); 
  
  return doctors.map(normalizeDoctor); 
}; 
/** 
 *  Get doctor by MongoDB _id, 
 *  legacyId or application id. */ 

export const getDoctorById = 
async (doctorId) => { 
  if (!doctorId) { return null; 
} 

let doctor = null; 

// Try MongoDB _id 

if ( 
  mongoose.Types.ObjectId.isValid( String(doctorId) ) ) 
  { 
    doctor = await Doctor.findById( doctorId ).lean(); 
  
  } 
  
  // Try legacy/application ID 
  
  if (!doctor) { 
    doctor = await Doctor.findOne({ 
      $or: [ 
        { 
          id: String(doctorId), 
        }, 
        { 
          legacyId: String(doctorId), 
        }, 
      ], 
    }
  )
    .lean(); 
  } 
  return normalizeDoctor(doctor); 
}; 
/** 
 *  Get doctors recommended by AI. 
 *  Filters are performed against MongoDB data. 
  */ 
 
export const getDoctorsByAIRecommendation = 
async ({ 
  department, 
  specialization, 
  visitType, 
  city, 
}
) => { 
  const filter = {}; 
  /** 
   *  Department 
   */ 
  
  if (department) { 
    filter.department = { 

      $regex: `^${escapeRegex(department)}$`, 
      $options: "i", 
    
    }; 
  } 
  /*
   Specialization 
   */ 
  if (specialization) { 
    
    filter.specialization = 
    { 
      $regex: escapeRegex(specialization), 
      $options: "i", 
    }; 
  } 
  /** 
     City 
     */ 
    
     if (city) { 
      filter.city = { 
        $regex: `^${escapeRegex(city)}$`, 
        $options: "i", 
      
      }; 
    } 
    const doctors = 
    await Doctor.find(filter) 
    .sort({ 
      rating: -1, 
      experience: -1, 
    }
  ) 
  .lean();

  let normalizedDoctors = 
  doctors.map(normalizeDoctor); 
  
  /**
    Consultation mode filtering. 
     MongoDB filter is intentionally handled 
      after normalization because existing data 
       may contain slightly different formats. 
       */ 
      
       if (visitType) { 
        const normalizedVisitType = 
        visitType .replace(/\s+/g, " ") 
        .trim() 
        .toLowerCase(); 
        
        normalizedDoctors = 
        normalizedDoctors.filter(
          (doctor) => { 
            const mode = doctor.consultationMode || ""; 
            
            return ( mode.includes(normalizedVisitType) || 
            normalizedVisitType.includes(mode) 
          ); 
        }); 
      
      } 
      return normalizedDoctors; 
    }; 
    /** 
     Escape user-provided text before using it 
      inside a MongoDB regular expression. */ 
      
      const escapeRegex = (value) => 
        { 
          return String(value).replace( /[.*+?^${}()|[\]\\]/g, "\\$&" ); 
        };