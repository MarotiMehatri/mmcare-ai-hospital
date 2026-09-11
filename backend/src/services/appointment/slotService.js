import Appointment from "../../models/Appointment.model.js"; 
import { getDoctorById, } from "./doctorService.js"; 

/** * Default slots. 
 *  These are fallback slots only. 
 *  For a production hospital system, these should 
 *  eventually come from a DoctorSchedule model. 
 */ 

const DEFAULT_SLOTS = 
[ 
  "09:00 AM", 
  "09:30 AM", 
  "10:00 AM", 
  "10:30 AM", 
  "11:00 AM", 
  "11:30 AM", 
  "12:00 PM", 
  "12:30 PM", 
  "01:00 PM", 
  "01:30 PM", 
  "02:00 PM", 
  "02:30 PM", 
  "03:00 PM", 
  "03:30 PM", 
  "04:00 PM", 
  "04:30 PM", 
  "05:00 PM", 
  "05:30 PM", 
  "06:00 PM", 
]; 

/** 
  Get available slots for a doctor. 
   Current implementation: 
    - Gets doctor from MongoDB 
    - Gets doctor's existing appointments 
    - Removes booked slots 
    */ 
   
    export const getSlotsByDoctorId = 
    async ( 
      doctorId, appointmentDate = null 
    ) => { 
      
      if (!doctorId) {   
        return []; 
      } 
      const doctor = await getDoctorById(doctorId); 
      if (!doctor) {   
        return []; 
      } 
      
      let slots = getDoctorDefaultSlots( doctor ); 
      
      /**
        If a specific date is provided,
         remove slots already booked on that date. 
         */ 
        
         if (appointmentDate) { 
          
          const bookedAppointments = 
          await Appointment.find(
            { 
              doctorId: String(doctorId), 
              appointmentDate: String(appointmentDate), 
              status: { 
                $nin: 
                [ 
                  "cancelled", 
                  "Cancelled", 
                  "CANCELLED", 
                ], 
              }, 
            }) 
            
            .select("appointmentTime") 
            .lean(); 
            
            const bookedTimes = new Set( bookedAppointments 
              .map( 
                (appointment) => appointment.appointmentTime 
              ) 
              .filter(Boolean) 
            ); 
            slots = slots.filter( 
              (slot) => 
                !bookedTimes.has(slot) 
            ); 
          } 
          return slots; 
        };

        /** 
          Get default doctor slots. 
           Uses doctor's availableTime when available. 
           */ 
          
           const getDoctorDefaultSlots = (doctor) => { 
            if ( doctor?.availableTime && 
              typeof doctor.availableTime === "string" 
            ) 
            { 
              const doctorTimes = doctor.availableTime .split(",") 
              .map((time) => time.trim()) 
              .filter(Boolean); 
              
              if (doctorTimes.length > 0) 
                { 
                  return doctorTimes; 
                } 
              } 
              return 
              [...DEFAULT_SLOTS]; 
            };