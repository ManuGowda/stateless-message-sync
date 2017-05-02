'use strict'

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
const expect = chai.expect;

import kafkaClient from './KafkaClient';

const sinon = require('sinon');
const sandbox = sinon.sandbox.create();

let success = { 'success': 200 };
let error = { 'error': 500 };

describe('sync-message', () => {

  let stubedSyncMessage;
  beforeEach(() => {
    stubedSyncMessage = sandbox.stub(kafkaClient, 'publishEvent');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('sync valid message: returns success', () => {

    stubedSyncMessage.returns(Promise.resolve(success));

    kafkaClient.publishEvent({ 'test': 'test' }, "test")
      .then((res) => {
        expect(res).to.equal(success);
      });
  });

  it('sync invalid message: returns error', () => {

    stubedSyncMessage.returns(Promise.resolve(error));

    kafkaClient.publishEvent(null, "test")
      .then((res) => {
        expect(res).to.equal(error);
      });
  });
});