// controllers/patientOnlineStatusController.js

export const getPatientOnlineStatus = (req, res) => {
  try {
    const onlinePatients = 10;

    res.status(200).json({
      success: true,
      onlinePatients,
      message: "Patient online status fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching patient online status:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient online status",
    });
  }
};
