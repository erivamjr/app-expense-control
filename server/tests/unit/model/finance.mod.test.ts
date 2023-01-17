import sinon from 'sinon';
import { expect } from 'chai';

import { createTransaction, listMovements } from '../../../src/models/finance.mod';
import { pool } from '../../../src/config/connections';
import { transactions } from '../mocks/fakeResponses';
describe('Get product in database', () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('Test function listMoviments', () => {
    it("should return a list of expenses", async () => {
      const queryStub = sandbox.stub(pool, 'query').resolves(transactions);

      const result = await listMovements();
      expect(result).to.deep.equal(transactions.rows);

      sinon.assert.calledOnce(queryStub);

    });
  });

  describe('Test function createTransaction', () => {
    it("should return a list of expenses created", async () => {
      const queryStub = sandbox.stub(pool, 'query').resolves(transactions);
      const { title, type, amount, category, user_id } = transactions.rows[0];
      const result = await createTransaction(title, type, amount, category, user_id);
      expect(result).to.deep.equal(transactions.rows);

      sinon.assert.calledOnce(queryStub);

    });
  });
});

