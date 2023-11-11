import fs from 'fs';
import csv from 'csv-parser';
import { MqttClient } from 'mqtt';
// import { Record, Payload } from '../../index.d';

const csvFilePath: string = 'meter_values.csv';

// Read CSV file and send records at 5-second intervals
export const sendRecords: (mqttClient: MqttClient) => void = (mqttClient) => {
  const records: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Process and format the data from the CSV row as needed
      // For example, parse JSON and extract charge_point_id and payload
      const data: {
        charge_point_id: string;
        payload: any;
      } = {
        charge_point_id: row.charge_point_id,
        payload: JSON.parse(row.payload),
      };

      records.push(data);
    })
    .on('end', () => {
      // Send records at 5-second intervals
      let recordIndex: number = 0;
      const sendInterval: NodeJS.Timeout = setInterval(() => {
        if (recordIndex < records.length) {
          // Publish the record to MQTT
          const record = records[recordIndex];
          mqttClient.publish(`pulseEnergy`, JSON.stringify(record));

          console.log(
            `Sent record for charge_point_id: ${record.charge_point_id}`
          );
          recordIndex++;
        } else {
          clearInterval(sendInterval); // Stop sending when all records are sent
        }
      }, 5000); // 5 seconds
    });
};
