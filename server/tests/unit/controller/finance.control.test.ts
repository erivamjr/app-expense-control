import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { getList, createTransaction } from '../../../src/controllers/finance.control';
import * as financeServ from '../../../src/services/finance.serv';
import { bodyCreateTransactionFake, transactionsFake } from '../mocks/fakeResponses';


describe('Test Finance of the controller layer', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Test getList of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {};

    it('should return the code 200 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(financeServ, 'listServiceMovements').resolves({ code: 200, resp: transactionsFake.rows });
      await getList(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      assert.calledOnce(response.status);
    });

    it('return array in format JSON', async () => {
      sandbox.stub(financeServ, 'listServiceMovements').resolves({ code: 200, resp: transactionsFake.rows });
      await getList(request, response);
      expect(response.json.calledWith(transactionsFake.rows)).to.be.equal(true);
    });
  });

  describe('Test createTransaction of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = { ...bodyCreateTransactionFake };

    it('should return the code 201 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(financeServ, 'createServiceTransaction').resolves({ code: 201, resp: transactionsFake.rows });
      await createTransaction(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      assert.calledOnce(response.status);
    });

    it('return array in format JSON', async () => {
      sandbox.stub(financeServ, 'createServiceTransaction').resolves({ code: 201, resp: transactionsFake.rows });
      await createTransaction(request, response);
      expect(response.json.calledWith(transactionsFake.rows)).to.be.equal(true);
    });

    it('should return the code 400 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(financeServ, 'createServiceTransaction').resolves({ code: 400, resp: transactionsFake.rows });
      await createTransaction(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
      assert.calledOnce(response.status);
    });
  });
});
