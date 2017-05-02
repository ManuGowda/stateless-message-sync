'use strict'

import { IMonitoring, MonitoringEvent } from '../interfaces/monitoring';
import { Router, Request, Response, NextFunction } from 'express';
import KafkaClient from '../services/KafkaClient';

class Monitoring implements IMonitoring {

  public topic: "monitoring";
  private eventData: MonitoringEvent

  publishEvent(payload: MonitoringEvent): Promise<any> {
    return KafkaClient.publishEvent(payload, this.topic);
  }
}

export default new Monitoring();