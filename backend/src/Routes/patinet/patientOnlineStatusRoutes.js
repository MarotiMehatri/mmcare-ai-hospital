import express from "express";

const router = express.Router();

import { getPatientOnlineStatus } from "../../controllers/patient/patientOnlineStatusController.js";

router.get("/", getPatientOnlineStatus);

export default router;
