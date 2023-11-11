// Load environment variables from a .env file
require('dotenv').config();

import { MqttClient, connect } from 'mqtt';

const BROKER_URL: string = process.env.BROKER_URL || '';

// Connect to the MQTT broker
const mqttClient: MqttClient = connect(BROKER_URL);

// Event handler when MQTT client connects
mqttClient.on('connect', () => {
  console.log('Connected to MQTT Server!');
});
