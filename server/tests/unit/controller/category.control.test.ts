import sinon from 'sinon';
import { expect } from 'chai';
import { getAllCategories } from '../../../src/controllers/category.control';
const categoryServ = require('../../../src/services/category.serv');

describe('Test Category of the controller layer', () => {

  describe('Test getAllCategories of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    beforeEach(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(categoryServ, 'getAllCategoriesService').resolves({ code: 200, resp: [] });

    });

    afterEach(() => {
      categoryServ.getAllCategoriesService.restore();
    });
    it('should return the code 200 of categories in controller', async () => {
      await getAllCategories(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('return array in format JSON', async () => {
      await getAllCategories(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });
});