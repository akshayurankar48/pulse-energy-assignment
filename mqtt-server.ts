// Load environment variables from a .env file
require('dotenv').config();

// Import MQTT-related modules and MongoDB-related modules
import { MqttClient, connect } from 'mqtt';
import mongoose from 'mongoose';
import { ChargingData } from './src/models/chargingDataModel';

// Get MQTT broker and MongoDB connection URLs from environment variables
const BROKER_URL: string = process.env.BROKER_URL || '';
const MONGO_URI: string = process.env.MONGO_URI || '';

// Connect to the MQTT broker
const mqttServer: MqttClient = connect(BROKER_URL);

// Event handler when MQTT server connects successfully
mqttServer.on('connect', () => {
  // Subscribe to the 'pulseEnergy' topic
  mqttServer.subscribe('pulseEnergy');
  console.log('MQTT Server started successfully!');

  // Set MongoDB options and connect to the database
  mongoose.set('strictQuery', false);
  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URI);

  // Get the MongoDB connection
  const db: mongoose.Connection = mongoose.connection;

  // Event handler for MongoDB connection errors
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Event handler once MongoDB connection is open
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
});

// Event handler for incoming MQTT messages on the 'pulseEnergy' topic
mqttServer.on('message', async (topic: string, message: Buffer) => {
  // Check if the received topic is 'pulseEnergy'
  if (topic === 'pulseEnergy') {
    const messagePayload = JSON.parse(message.toString());

    // Check if a record with the charge_point_id already exists in MongoDB
    const existingRecord = await ChargingData.findOne({
      charge_point_id: messagePayload.charge_point_id,
    });

    // If the record doesn't exist, save a new Charging Record to MongoDB
    if (!existingRecord) {
      const newChargingRecord = new ChargingData({
        charge_point_id: messagePayload.charge_point_id,
        payload: messagePayload.payload,
        timestamp: new Date(), // Optionally, you can add a timestamp
      });

      await newChargingRecord.save();
      console.log('Charging Record saved to MongoDB.');
    } else {
      // If the record already exists, log a message and skip saving
      console.log('Record already exists in MongoDB. Skipping.');
    }
  } else {
    // Log a message for topic mismatch
    console.log('Topic mismatch.');
  }
});

// Event handlers for MQTT server close, end, and error events
mqttServer.on('close', () => {
  handleServerClose();
});

mqttServer.on('end', () => {
  handleServerClose();
});

mqttServer.on('error', (error) => {
  console.log('Error occurred:', error);
  handleServerClose();
});

// Function to handle closing the MQTT server and disconnecting from MongoDB
function handleServerClose() {
  mqttServer.unsubscribe('pulseEnergy');
  mongoose.disconnect();
  console.log('Server closed.');
}
