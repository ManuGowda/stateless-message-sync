import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/v1/monitoring', () => {

  it('responds with status 200', () => {
    return chai.request(app)
      .post('/api/v1/monitoring')
      .send({
        "correlation_id": "42c36092-82a1-3a00-93d1-46196ee77204",
        "device_id": "52c36092-82a1-4a00-93d1-46196ee77204",
        "device_root_id": "22c36092-52a1-3a00-93d1-46196ee77204",
        "event_name": "test",
        "event_value": "100",
        "device_type": "LPD",
        "metadata": { "page": "login" },
        "account_id": 2,
        "app_version": 1,
        "created_at": "2017-01-01 12:01"
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
      });
  });
});