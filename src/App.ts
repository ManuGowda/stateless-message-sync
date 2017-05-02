import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// import * as appRoutes from './routes';
import monitoring from './routes/monitoring';

class App {
  /*Express instance*/
  public express: express.Application;

  /*Configuration methods on express instance*/
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  /*Configure express middleware*/
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /*Configure api endpoints*/
  private routes(): void {
    let router = express.Router();
    router.get('/aliveness-test', (req, res, next) => {

      res.json({
        status: "ok", version: "1.0.0", message: "UP"
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/monitoring', monitoring);
  }
}

export default new App().express;