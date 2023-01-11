import { getAllCategoriesModel, createCategoryModel } from "../../../src/models/category.mod";
import { SinonSandbox, createSandbox, assert } from "sinon";
import { expect } from "chai";
import { pool } from "../../../src/config/connections";
import { categories } from "./mocks/fakeResponses";

describe("categoriesModel", () => {
  // Type for sandbox
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  describe("getAllCategoriesModel", () => {
    it("should return a list of categories", async () => {
      // Stub the pool.query function
      const queryStub = sandbox.stub(pool, "query").resolves(categories);

      const result = await getAllCategoriesModel();
      expect(result).to.deep.equal(categories.rows);

      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });
  });

  describe("createCategoryModel", () => {
    it("should create a new category", async () => {
      // Stub the pool.query function
      const queryStub = sandbox
        .stub(pool, "query")
        .resolves({ rows: [{ id: 3, category: "Category 3", user_id: "123" }] });

      const result = await createCategoryModel("Category 3", "123");
      expect(result).to.deep.equal([{ id: 3, category: "Category 3", user_id: "123" }]);

      // Assert that the stub was called correctly
      assert.calledOnce(queryStub);
    });
  });
});

