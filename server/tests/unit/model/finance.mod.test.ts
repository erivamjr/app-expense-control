import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';

import { createTransaction, deleteTransaction, listMovements, updateTransaction } from '../../../src/models/finance.mod';
import { pool } from '../../../src/config/connections';
import { transactions } from '../mocks/fakeResponses';
describe('Expensses in database', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('Test function listMoviments', () => {
    it("should return a list of expenses", async () => {
      const queryStub = sandbox.stub(pool, 'query').resolves(transactions);

      const result = await listMovements();
      expect(result).to.deep.equal(transactions.rows);

      assert.calledOnce(queryStub);

    });
  });

  describe('Test function createTransaction', () => {
    it("should return a list of expenses created", async () => {
      const queryStub = sandbox.stub(pool, 'query').resolves(transactions);
      const { title, type, amount, category, user_id } = transactions.rows[0];
      const result = await createTransaction(title, type, amount, category, user_id);
      expect(result).to.deep.equal(transactions.rows);

      assert.calledOnce(queryStub);

    });

    it("should return an error if the parameters passed are not correct", async () => {
      try {
        await createTransaction("", "", 0, "", "");
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });
  });

  describe('Test function updatedTransaction', () => {
    it("should return a list of expenses updated", async () => {
      const queryStub = sandbox.stub(pool, 'query').resolves(transactions);
      const { title, type, amount, category, id, user_id } = transactions.rows[0];
      const result = await updateTransaction(title, type, amount, category, id.toString(), user_id);
      expect(result).to.deep.equal(transactions.rows);

      assert.calledOnce(queryStub);

    });
  });

  describe('Test function deleteTransaction', () => {
    it("should return a list of expenses deleted", async () => {
      // Arrange
      const queryStub = sandbox.stub(pool, 'query').resolves({ rowCount: 1 });
      const id = 1;
      const userId = '123';

      // Act
      const result = await deleteTransaction(id.toString(), userId);

      // Assert
      expect(result).to.equal(1);
      assert.calledOnce(queryStub);

    });
  });


});

