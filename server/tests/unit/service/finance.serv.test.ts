import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import * as financeMod from "../../../src/models/finance.mod"
import { listServiceMovements } from "../../../src/services/finance.serv";
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
});