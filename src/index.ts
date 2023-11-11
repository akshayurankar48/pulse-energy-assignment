// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and libraries
import express, { Express } from 'express';
import { MqttClient, connect } from 'mqtt';
import http from 'http';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

// Import the router for handling charging point routes
import router from './routes/chargingPointRoute';

// Import utility function for sending records to MQTT server
import { sendRecords } from './utils/sendRecords';

// Import custom error middleware
import { errorMiddleware } from './middlewares/errorMiddleware';

// Retrieve values from environment variables or use default values
const PORT: string | 8000 = process.env.PORT || 8000;
const MONGO_URI: string = process.env.MONGO_URI;
const BROKER_URL: string = process.env.BROKER_URL || '';

// Connect to the MQTT broker
const mqttClient: MqttClient = connect(BROKER_URL);

// Create an Express application
const app: Express = express();

// CORS configuration for allowing cross-origin requests
var corsOptions: {
  origin: string;
  optionsSuccessStatus: number;
} = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply middleware for enabling CORS, compression, JSON body parsing, and custom error handling
app.use(cors(corsOptions));
app.use(compression());
app.use(bodyParser.json());
app.use(errorMiddleware);

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

// Use the charging point router for handling API routes under the '/api' path
app.use('/api', router());
