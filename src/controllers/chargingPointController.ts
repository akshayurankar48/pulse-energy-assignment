import express from 'express';

// Import the ChargingData model for interacting with MongoDB
import { ChargingData } from '../models/chargingDataModel';

// Controller function to get all charging data with optional pagination
export const getAllChargingData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extract pagination parameters from the request query
    const page = Number(req.query.page) || 0;
    const dataPerPage = 10;

    // Extract charge point IDs from the request query and split them
    let chargePointIds: string[] = [];

    if (Array.isArray(req.query.chargePointIds)) {
      chargePointIds = req.query.chargePointIds
        .map(String)
        .flatMap((id) => id.split(','));
    } else if (typeof req.query.chargePointIds === 'string') {
      chargePointIds = req.query.chargePointIds.split(',');
    }

    // Create a filter object based on charge point IDs
    const filter =
      chargePointIds.length > 0
        ? { charge_point_id: { $in: chargePointIds } }
        : {};

    // Query MongoDB to get charging data based on the filter and pagination
    const chargingData = await ChargingData.find(filter)
      .skip(page * dataPerPage)
      .limit(dataPerPage);

    // Send a JSON response with the retrieved charging data
    res.status(200).json(chargingData);
  } catch (error) {
    // Log and handle any errors that occur during the process
    console.log(error);
    return res.sendStatus(400);
  }
};

// Controller function to get charging data by ID
export const getChargingDataById = async (
  req: express.Request,
  res: express.Response
) => {};
