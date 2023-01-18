import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import * as financeMod from "../../../src/models/finance.mod"
import { createServiceTransaction, deleteServiceTransaction, listServiceMovements, updateServiceTransaction } from "../../../src/services/finance.serv";
import { transactions } from "../mocks/fakeResponses";

describe('Test Service finance', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  })
  afterEach(() => {
    sandbox.restore();
  });
  describe('Test function listServiceMovements', () => {
    it('should return all moviments', async () => {
      //Arrage
      const lisMovementsStub = sandbox.stub(financeMod, 'listMovements');
      lisMovementsStub.resolves(transactions.rows);
      //Action
      const result = await listServiceMovements();
      //Assert
      expect(result).to.deep.equal({ code: 200, resp: transactions.rows });
    });

    it('When don\'t return moviments', async () => {
      //Arrage
      const createTransactionStub = sandbox.stub(financeMod, 'listMovements');
      createTransactionStub.resolves(null);
      //Action
      const result = await listServiceMovements();
      //Assert
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
    });
  });

  describe('Test function createServiceTransaction', () => {
    it('should return moviments created', async () => {
      //Arrage
      const createTransactionStub = sandbox.stub(financeMod, 'createTransaction');
      createTransactionStub.resolves(transactions.rows[0]);
      //Action
      const result = await createServiceTransaction({ title: "Freelancer de website", type: "deposit", amount: 6000, category: "Dev" }, "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 201, resp: transactions.rows[0] });
    });

    it('When don\'t return moviments', async () => {
      //Arrage
      const createTransactionStub = sandbox.stub(financeMod, 'createTransaction');
      createTransactionStub.resolves(null);
      //Action
      const result = await createServiceTransaction({ title: "Freelancer de website", type: "deposit", amount: 6000, category: "Dev" }, "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
    });
  });

  describe('Test function updateServiceTransaction ', () => {
    it('should return moviments updated', async () => {
      //Arrage
      const createTransactionStub = sandbox.stub(financeMod, 'updateTransaction');
      createTransactionStub.resolves([transactions.rows[0]]);
      //Action
      const result = await updateServiceTransaction({ title: "Freelancer de website", type: "deposit", amount: 6000, category: "Dev" }, "1", "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 200, resp: [transactions.rows[0]] });
    });

    it('when haven\'t id of user', async () => {
      //Action
      const result = await updateServiceTransaction({ title: "Freelancer de website", type: "deposit", amount: 6000, category: "Dev" }, "1", "");
      //Assert
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again with user' } });
    });

    it('when don\'t return update', async () => {
      //Arrage
      const createTransactionStub = sandbox.stub(financeMod, 'updateTransaction');
      createTransactionStub.resolves([]);
      //Action
      const result = await updateServiceTransaction({ title: "Freelancer de website", type: "deposit", amount: 6000, category: "Dev" }, "1", "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
    });
  })
  describe('Test function deleteServiceTransaction', () => {
    it('should return code 204 with success', async () => {
      const deleteTransactionStub = sandbox.stub(financeMod, 'deleteTransaction');
      deleteTransactionStub.resolves({ rowCount: 1 });
      //Action
      const result = await deleteServiceTransaction("1", "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 204, resp: { rowCount: 1 } });
    });

    it('should return code 204 with success', async () => {
      const deleteTransactionStub = sandbox.stub(financeMod, 'deleteTransaction');
      deleteTransactionStub.resolves(null);
      //Action
      const result = await deleteServiceTransaction("1", "fb66bf68-3cc1-427b-8951-2de7a6a8ca61");
      //Assert
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
    });
  })
});