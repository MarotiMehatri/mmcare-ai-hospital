import React from "react";
import { FaFilePdf, FaImage, FaFileAlt } from "react-icons/fa";
import "../../Styles/AI/ReportPreviewCard.css";

function ReportPreviewCard({ selectedFile }) {
  if (!selectedFile) {
    return (
      <div className="report-preview-card empty">
        <FaFileAlt className="preview-icon" />
        <p>No report selected yet</p>
      </div>
    );
  }

  const isImage = selectedFile.type.startsWith("image/");
  const isPdf = selectedFile.type === "application/pdf";

  return (
    <div className="report-preview-card">
      <h3>Report Preview</h3>

      <div className="preview-info">
        <p>
          <strong>File Name:</strong> {selectedFile.name}
        </p>
        <p>
          <strong>File Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
        </p>
        <p>
          <strong>File Type:</strong> {selectedFile.type}
        </p>
      </div>

      <div className="preview-box">
        {isImage && (
          <>
            <FaImage className="file-type-icon" />
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="report-preview"
              className="report-image-preview"
            />
          </>
        )}

        {isPdf && (
          <div className="pdf-preview">
            <FaFilePdf className="file-type-icon pdf" />
            <p>PDF selected and ready for upload</p>
          </div>
        )}

        {!isImage && !isPdf && (
          <div className="other-preview">
            <FaFileAlt className="file-type-icon" />
            <p>Unsupported preview format</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPreviewCard;
