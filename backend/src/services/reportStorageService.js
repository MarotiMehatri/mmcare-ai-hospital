import mongoose from "mongoose"; 
import ReportAnalysis from "../models/ReportAnalysis.model.js"; 

/** * Check whether a value is a valid MongoDB ObjectId. */ 

const isValidObjectId = (value) => { 
  return mongoose.Types.ObjectId.
  isValid(String(value)); 
}; 
  
  /** * Save a new AI report analysis. * 
   * * Data is stored directly in MongoDB. */ 
  
  export const saveReportAnalysis = async (record) => { 
    if (!record || typeof record !== "object") { 
      throw new Error("Report analysis record is required"); 
    } if (!record.patientId) { 
      throw new Error("patientId is required"); 
    } const newRecord = await ReportAnalysis.create({ 
      ...record, 
    }); 
    return newRecord.toObject(); 
  };

  /** * Get all AI report analyses for a patient. * 
   * * Latest reports are returned first. */ 
  
  export const getPatientReportHistory = async (patientId) => { 
    if (!patientId) { return []; 
    } 
    const reports = await ReportAnalysis.find({ 
      patientId: String(patientId), }) 
      .sort({ createdAt: -1 }) 
    .lean(); return reports; }; 

    /** * Get one AI report analysis by MongoDB _id * or legacyId. */ 
    
    export const getSingleReportAnalysis = async (id) => { 
      if (!id) { return null; 
      } 
      let report = null;  

      //First try MongoDB _id. 
       if (isValidObjectId(id)) { 
        report = await ReportAnalysis.findById(id).lean(); 
      }  
      
      //If not found, try legacyId. 
      if (!report) { 
        report = await ReportAnalysis.findOne({ 
          legacyId: String(id), 
        }).lean(); 
      } 
      return report; 
    }; 
    
    /** * Update an existing report analysis. *
     *  * Useful if the AI analysis is processed in multiple stages. */ 
    
    export const updateReportAnalysis = async (id, updates) => { 
      if (!id) { 
        throw new Error("Report analysis id is required"); 
      } 
      if (!updates || typeof updates !== "object") { 
        throw new Error("Updates are required"); 
      } 

      let report = null; 
      
      if (isValidObjectId(id)) { 
        report = await ReportAnalysis.findByIdAndUpdate( 
          id, 
          { $set: updates, }, 
          { new: true, runValidators: true, } 
        ).lean(); 
      } 
      if (!report) { 
        report = await ReportAnalysis.findOneAndUpdate( 
          { legacyId: String(id), }, 
          { $set: updates, }, 
          { new: true, runValidators: true, } 
        ).lean(); 
      } 
      return report; 
    }; 
    
    /** * Delete one report analysis. */ 
    
    export const deleteReportAnalysis = async (id) => { 
      if (!id) 
        { 
          throw new Error("Report analysis id is required"); 
        } 
        
        let result = null; 
        if (isValidObjectId(id)) { 
          
          result = await ReportAnalysis.findByIdAndDelete(id); 
        } 
        
        if (!result) { 
          result = await ReportAnalysis.findOneAndDelete(
            { legacyId: String(id),}
          ); 
        } 
        return result ? result.toObject() : null; 
      };