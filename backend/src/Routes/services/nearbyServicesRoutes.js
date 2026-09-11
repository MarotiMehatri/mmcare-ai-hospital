import express from "express";
import { searchNearbyServices } from "../../controllers/services/nearbyServicesController.js";

const router = express.Router();

router.post("/search", searchNearbyServices);

export default router;
