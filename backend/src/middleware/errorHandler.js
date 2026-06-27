export const errorHandler = (err, req, res, next) => {
  console.error("Server error:", err);

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: err.message || "File upload error.",
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
};
