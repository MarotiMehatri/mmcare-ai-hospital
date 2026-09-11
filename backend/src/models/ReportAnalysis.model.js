import mongoose from "mongoose";
const { Schema } = mongoose;
const reportAnalysisSchema = new Schema(
  {
    legacyId: { 
        type: String, 
        index: true, 
        unique: true, 
        sparse: true 
    },
    patientId: { 
        type: String, 
        required: true, 
        index: true 
    },
    patientName: { 
        type: String, 
        default: "", 
        trim: true 
    },
    reportType: { 
        type: String, 
        default: "", trim: true, 
        index: true 
    },
    reportName: { 
        type: String, 
        default: "", 
        trim: true 
    },
    fileName: { 
        type: String, 
        default: "", 
        trim: true 
    },
    fileUrl: { 
        type: String, 
        default: "" 
    },
    mimeType: { 
        type: String, 
        default: "" 
    },
    fileSize: { 
        type: Number, 
        default: 0 
    },
    analysis: { 
        type: Schema.Types.Mixed, 
        default: {} 
    },
    summary: { 
        type: String, 
        default: "" 
    },
    findings: { 
        type: Schema.Types.Mixed, 
        default: [] 
    },
    recommendations: { 
        type: Schema.Types.Mixed, 
        default: [] 
    },
    riskLevel: { 
        type: String, 
        default: "", 
        index: true 
    },
    status: { 
        type: String, 
        default: "completed", 
        index: true 
    },
    analyzedBy: { 
        type: String, 
        default: "AI" 
    },
  },
  { 
    timestamps: true, 
    strict: false, 
    collection: "reportAnalyses" 
},
);
reportAnalysisSchema.index({ patientId: 1, createdAt: -1 });
reportAnalysisSchema.index({ reportType: 1, createdAt: -1 });

const ReportAnalysis =
  mongoose.models.ReportAnalysis ||
  mongoose.model("ReportAnalysis", reportAnalysisSchema);
export default ReportAnalysis;
