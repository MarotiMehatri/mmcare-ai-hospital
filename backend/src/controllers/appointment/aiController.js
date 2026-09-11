import { GoogleGenAI } from "@google/genai"; 

export const handleAIChat = async (req, res) => 
  { 
    try 
    { 
      const 
      {
         message, 
         patientId, 
         role 
        } = req.body; 
        
        const file = req.file; 
        
        // -------------------------------------------------- 
        // Validate input // 
        // -------------------------------------------------- 
        
        if (!message && !file) 
          { 
            return res.status(400).json({ 
              success: false, 
              error: "Message or scan file is required.", 
            }); 
          } 
          
          // -------------------------------------------------- 
          //  Validate Gemini API key 
          // -------------------------------------------------- 
          
          if (!process.env.GEMINI_API_KEY) 
            { 
              return res.status(500).json({ 
                success: false, 
                error: "GEMINI_API_KEY is missing in backend .env file.", 
              }); 
            } 
            
            // -------------------------------------------------- 
            //  Create Gemini client 
            //  -------------------------------------------------- 
            
            const client = new GoogleGenAI({ 
              apiKey: process.env.GEMINI_API_KEY, 
            }); 
            
            // -------------------------------------------------- 
            //  File information 
            //  -------------------------------------------------- 
            
            let fileInfo = "No file uploaded."; 
            if (file) { 
              fileInfo = ` 
              Uploaded File Name: ${file.originalname} 
              File Type: ${file.mimetype} 
              File Size: ${file.size} bytes `; 
            } 
            
            // -------------------------------------------------- // AI Prompt // -------------------------------------------------- 
             
            const prompt = ` 
            You are an intelligent and helpful AI medical assistant for a Hospital Management System. 
            Patient Role: ${role || "patient"} 
            Patient ID: ${patientId || "N/A"} 
            Patient Message: ${message || "No text message provided."} 
            File Information: ${fileInfo} 
            
            Important Rules: 
            1. Give short, clear and patient-friendly answers. 
            2. Do not provide a final medical diagnosis. 
            3. Suggest the appropriate hospital department when possible. 
            4. Suggest doctor consultation when required. 
            5. If symptoms seem serious or emergency-related, advise immediate hospital or emergency support. 
            6. Keep the tone professional, safe and supportive. 
            7. Format the response clearly using points when useful. 
            8. Do not claim to have analyzed the actual medical file unless its contents were provided to you. 
            `; 
            
            // -------------------------------------------------- // Gemini request // -------------------------------------------------- 
            
            const response = await client.models.generateContent({ 
              model: "gemini-2.5-flash", 
              contents: prompt, 
            }); 
            
            const reply = response?.text?.trim() || "Sorry, I could not generate a response."; 
            console.log("========== GEMINI AI CHAT SUCCESS =========="); 
            
            return res.status(200).json({ 
              success: true, 
              reply, 
              meta: 
              { 
                patientId: patientId || null, 
                role: role || "patient", 
                hasFile: Boolean(file), 
              }, 
            }); 
          } 
          catch (error) { 
            
            console.error("========== GEMINI AI CONTROLLER ERROR =========="); 
            console.error("Message:", error.message); 
            console.error(error); if (error.code === "LIMIT_FILE_SIZE") 
              { 
                return res.status(413).json({ 
                  success: false, 
                  error: "Uploaded file is too large. Please upload a file smaller than 5MB.", 
                }); 
              } 
              
              return res.status(500).json({ 
                success: false, 
                error: error.message || "Failed to process AI request.", 
              }); 
            } 
          };