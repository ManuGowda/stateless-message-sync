'use strict'

export interface IMonitoring {
  topic: string;
  publishEvent(payload: MonitoringEvent): Promise<any>
};

export class MonitoringEvent {
  correlation_id: string;
  device_id: string;
  device_root_id: string;
  event_name: string;
  event_value: number;
  device_type: string;
  metadata: string;
  account_id: number;
  app_version: number;
  created_at: number;
}