// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and libraries
import express, { Express } from 'express';
import { MqttClient, connect } from 'mqtt';
import http from 'http';

// Retrieve values from environment variables or use default values
const PORT: string | 8000 = process.env.PORT || 8000;

const BROKER_URL: string = process.env.BROKER_URL || '';

// Connect to the MQTT broker
const mqttClient: MqttClient = connect(BROKER_URL);

// Create an Express application
const app: Express = express();

// Event handler when MQTT client connects
mqttClient.on('connect', () => {
  console.log('Connected to MQTT Server!');
});

// Create an HTTP server using the Express application
const httpServer: http.Server = http.createServer(app);

// Start the HTTP server and listen on the specified port
httpServer.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
