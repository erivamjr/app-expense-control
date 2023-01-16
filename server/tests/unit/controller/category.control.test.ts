// import sinon from 'sinon';
import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { getAllCategories } from '../../../src/controllers/category.control';
import * as categoryServ from '../../../src/services/category.serv';


describe('Test Category of the controller layer', () => {
  let sandbox: SinonSandbox;
  const response = {} as any;
  const request = {} as any;
  request.body = {};
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('Test getAllCategories of the controller layer', () => {
    it('should return the code 200 of categories in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(categoryServ, 'getAllCategoriesService').resolves({ code: 200, resp: [] });
      await getAllCategories(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      assert.calledOnce(response.status);
    });
    it('return array in format JSON', async () => {
      sandbox.stub(categoryServ, 'getAllCategoriesService').resolves({ code: 200, resp: [] });
      await getAllCategories(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
});