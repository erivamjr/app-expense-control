import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import * as financeMod from "../../../src/models/finance.mod"
import { createServiceTransaction, listServiceMovements } from "../../../src/services/finance.serv";
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
  });

  describe('Test function createTransaction', () => {
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

});