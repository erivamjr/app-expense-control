import sinon from "sinon";
import { expect } from "chai";
import { pool } from "../../../src/config/connections";
import { createUserModel, deleteUserModel, getAllRegisterByUserModel, searchEmail } from "../../../src/models/user.mod";
import { userData } from "../mocks/fakeUsers";

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

  describe('serch email', () => {
    it('should return a email', async () => {
      //Arrange
      const queryStub = sandbox.stub(pool, "query");
      queryStub.resolves({
        rows: [
          {
            email: 'johndoe@postgres.com'
          }
        ]
      });
      // Action
      const result = await searchEmail('johndoe@postgres.com');
      //Assert
      expect(result).to.deep.equal({
        rows: [
          {
            email: 'johndoe@postgres.com'
          }
        ]
      });
    });
  });

  describe('should to delete', () => {
    it('should return 1', async () => {
      //Arrange
      const queryStub = sandbox.stub(pool, "query");
      queryStub.resolves({ rowCount: 1 });
      // Action
      const result = await deleteUserModel('1');
      //Assert
      expect(result).to.be.equal(1);
    });
  });


  describe('Get all data user', () => {
    it('should return all data users', async () => {
      //Arrange
      const queryStub = sandbox.stub(pool, 'query');
      queryStub.resolves({ rows: [userData] });
      // Action
      const result = await getAllRegisterByUserModel('fb66bf68-3cc1-427b-8951-2de7a6a8ca61');
      //Assert
      expect(result).to.deep.equal(userData);
    })
  })
});