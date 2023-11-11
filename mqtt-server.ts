// Load environment variables from a .env file
require('dotenv').config();

// Import MQTT-related modules and MongoDB-related modules
import { MqttClient, connect } from 'mqtt';
import mongoose from 'mongoose';

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
    console.log(messagePayload);
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
  console.log('Server closed.');
}
