import express from 'express';

// Import the ChargingData model for interacting with MongoDB
import { ChargingData } from '../models/chargingDataModel';

// Controller function to get all charging data with optional pagination
export const getAllChargingData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Query MongoDB to get charging data based on the filter and pagination
    const chargingData = await ChargingData.find({});

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
