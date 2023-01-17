import sinon from "sinon";
import { expect } from "chai";
import { pool } from "../../../src/config/connections";
import { createUserModel } from "../../../src/models/user.mod";

describe("User Model", () => {
  let sandbox: sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe("Create User", () => {
    it("should create a new user", async () => {
      // Arrange
      const queryStub = sandbox.stub(pool, "query");
      queryStub.resolves({
        rows: [
          {
            id: "004a3f72-762d-45c1-918b-ca563d30368b",
            name: "Jhon Doe",
            role: "admin",
            email: "jhondoe@postgres.com",
            password: "$2a$10$BM1Z5GvbhuYHkE/W5DfUe.H4OpmvNYLn09y0b9N8RvSBudhJ00qnO",
            created_at: "2023-01-17T18:23:31.149-03:00",
          },
        ],
      });
      //Action
      const result = await createUserModel("004a3f72-762d-45c1-918b-ca563d30368b", "Jhon Doe", "jhondoe@postgres.com", "jhon123");
      //Assert
      expect(result).to.deep.equal({
        rows: [
          {
            id: "004a3f72-762d-45c1-918b-ca563d30368b",
            name: "Jhon Doe",
            role: "admin",
            email: "jhondoe@postgres.com",
            password: "$2a$10$BM1Z5GvbhuYHkE/W5DfUe.H4OpmvNYLn09y0b9N8RvSBudhJ00qnO",
            created_at: "2023-01-17T18:23:31.149-03:00",
          },
        ],
      });
    });
  });
});
// console.log('CONSOLANDO RESULTADO', result);