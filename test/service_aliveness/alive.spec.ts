import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Service', () => {

  it("should be alive", async () => {
    const res = await chai.request(app).get('/aliveness-test');
    expect(res.status).to.equal(200);
  });
});