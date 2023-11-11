import express from 'express';
import {
  getAllChargingData,
  getChargingDataById,
} from 'controllers/chargingPointController';

// Create an instance of Express Router
const router = express.Router();

// Define and export a function to configure and return the charging point router
export default (): express.Router => {
  // Define route for getting all charging data
  router.get('/charging-data', getAllChargingData);

  // Define route for getting charging data by ID
  router.get('/charging-data/:id', getChargingDataById);

  // Return the configured router
  return router;
};
