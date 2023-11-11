// Load environment variables from a .env file
require('dotenv').config();

// Import MQTT-related modules and MongoDB-related modules
import { MqttClient, connect } from 'mqtt';

// Get MQTT broker and MongoDB connection URLs from environment variables
const BROKER_URL: string = process.env.BROKER_URL || '';

// Connect to the MQTT broker
const mqttServer: MqttClient = connect(BROKER_URL);

// Event handler when MQTT server connects successfully
mqttServer.on('connect', () => {
  // Subscribe to the 'pulseEnergy' topic
  mqttServer.subscribe('pulseEnergy');
  console.log('MQTT Server started successfully!');
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
