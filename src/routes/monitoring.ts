import { Router, Request, Response, NextFunction } from 'express';
import monitoringModel from '../models/monitoring';

export class Monitoring {
  public router: Router;
  public monitoring;

  constructor() {
    this.router = Router();
    this.init();
  }

  /*
  POST monitoring events to kafka
  */
  public postMonitoringEvent(req: Request, res: Response, next: NextFunction) {
    monitoringModel.publishEvent(req.body)
      .then((result) => {
        res.send({ success: 200 });
      })
      .catch((err) => {
        res.send({ failure: 500 });
      });
  }

  init() {
    this.router.post('/', this.postMonitoringEvent);
  }
}

const monitoring = new Monitoring();
monitoring.init();

export default monitoring.router;