import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { getAllCategories, createCategory } from '../../../src/controllers/category.control';
import * as categoryServ from '../../../src/services/category.serv';
import { respCategoryFake } from '../mocks/fakeResponses';


describe('Test Category of the controller layer', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('Test getAllCategories of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {};

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

  describe('Test createCategory of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {
      category: 'Estudos',
      user: {
        id: 'fb66bf68-3cc1-427b-8951-2de7a6a8ca61',
        email: 'erivamdev@gmail.com',
        role: 'admin',
        name: 'José Erivam'
      }
    };

    it('should return the code 201 of category created in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(categoryServ, 'createCategoryService').resolves({
        code: 201,
        resp: respCategoryFake
      });
      await createCategory(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      assert.calledOnce(response.status);
    });

    it('return array in format JSON', async () => {
      sandbox.stub(categoryServ, 'createCategoryService').resolves({
        code: 201,
        resp: respCategoryFake
      });
      await createCategory(request, response);
      expect(response.json.calledWith(respCategoryFake)).to.be.equal(true);
    });
  });

  describe('When result not success', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {
      //category empty string to return error by undefined string
      category: '',
      user: {
        id: 'fb66bf68-3cc1-427b-8951-2de7a6a8ca61',
        email: 'erivamdev@gmail.com',
        role: 'admin',
        name: 'José Erivam'
      }
    };
    it('should return the code 400 of category created in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      await createCategory(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
      assert.calledOnce(response.status);
    });
  });
});