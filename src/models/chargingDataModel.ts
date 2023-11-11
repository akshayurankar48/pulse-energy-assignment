import mongoose, { Schema } from 'mongoose';

// Define a schema for charging data
const chargingDataSchema = new Schema({
  charge_point_id: String,
  payload: {
    connectorId: Number,
    transactionId: Number,
    meterValue: [
      {
        timestamp: String,
        sampledValue: [
          {
            value: String,
            context: String,
            measurand: String,
            unit: String,
            phase: String,
          },
        ],
      },
    ],
  },
  timestamp: Date, // Optionally, you can add a timestamp field
});

// Define a charging data model
export const ChargingData = mongoose.model('ChargingData', chargingDataSchema);
