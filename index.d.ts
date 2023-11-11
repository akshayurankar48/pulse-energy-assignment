export interface SampledValue {
  value: string;
  context: string;
  measurand: string;
  unit: string;
  phase?: string;
}

export interface MeterValue {
  timestamp: string;
  sampledValue: SampledValue[];
}

export interface Payload {
  connectorId: number;
  transactionId: number;
  meterValue: MeterValue[];
}

export interface Record {
  charge_point_id: string;
  payload: Payload;
}
