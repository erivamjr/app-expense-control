import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import * as categoryMod from '../../../src/models/category.mod';
import { createCategoryService, getAllCategoriesService } from '../../../src/services/category.serv';
import { categories } from '../mocks/fakeResponses';


describe('Test Category of the service layer', () => {
  // Type for sandbox
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  describe('Test getAllCategoriesService of the service layer', () => {
    it('should return a list of categories in service', async () => {
      // Stub the pool.query function
      const queryStub = sandbox.stub(categoryMod, 'getAllCategoriesModel').resolves(categories.rows);
      // test functrion of get code and categories from service
      const result = await getAllCategoriesService();
      expect(result).to.deep.equal({ code: 200, resp: categories.rows });
      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });

    it('when not given categories', async () => {
      // Stub the pool.query function
      const queryStub = sandbox.stub(categoryMod, 'getAllCategoriesModel').resolves(null);
      // test functrion of get code and categories from service
      const result = await getAllCategoriesService();
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });
  });

  describe('Test createCategoryService of the service layer', () => {
    it('should return a category created in service', async () => {
      // Stub the pool.query function
      const queryStub = sandbox.stub(categoryMod, 'createCategoryModel').resolves(categories.rows[0].category);
      // test functrion of get code and categories from service
      const result = await createCategoryService(categories.rows[0].category, '123');
      expect(result).to.deep.equal({ code: 201, resp: categories.rows[0].category });
      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });

    it('when not returned category created', async () => {
      // Stub the pool.query function
      const queryStub = sandbox.stub(categoryMod, 'createCategoryModel').resolves(null);
      // test functrion of get code and categories from service
      const result = await createCategoryService(categories.rows[0].category, '123');
      expect(result).to.deep.equal({ code: 404, resp: { message: 'Error of response try again' } });
      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });
  });
});
