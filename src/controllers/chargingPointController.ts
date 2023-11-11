import express from 'express';

// Import the ChargingData model for interacting with MongoDB
import { ChargingData } from '../models/chargingDataModel';

// Controller function to get all charging data with optional pagination
export const getAllChargingData = async (
  req: express.Request,
  res: express.Response
) => {};

// Controller function to get charging data by ID
export const getChargingDataById = async (
  req: express.Request,
  res: express.Response
) => {};
