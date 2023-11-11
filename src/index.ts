// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and libraries
import express, { Express } from 'express';
import { MqttClient, connect } from 'mqtt';
import http from 'http';
import mongoose from 'mongoose';
import { sendRecords } from './utils/sendRecords';

// Retrieve values from environment variables or use default values
const PORT: string | 8000 = process.env.PORT || 8000;
const MONGO_URI: string = process.env.MONGO_URI;
const BROKER_URL: string = process.env.BROKER_URL || '';

// Connect to the MQTT broker
const mqttClient: MqttClient = connect(BROKER_URL);

// Create an Express application
const app: Express = express();

// Event handler when MQTT client connects
mqttClient.on('connect', () => {
  console.log('Connected to MQTT Server!');
  // Call utility function to send records to the MQTT server
  sendRecords(mqttClient);
});

// Create an HTTP server using the Express application
const httpServer: http.Server = http.createServer(app);

// Start the HTTP server and listen on the specified port
httpServer.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Set MongoDB options and connect to the database
mongoose.set('strictQuery', false);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

// Event handler for MongoDB connection errors
mongoose.connection.on('error', (error: Error) => console.log(error));
