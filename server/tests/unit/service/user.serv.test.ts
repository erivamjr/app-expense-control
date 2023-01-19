import { createSandbox, SinonSandbox } from "sinon";
import { createUserService } from "../../../src/services/user.serv";
import * as userMod from "../../../src/models/user.mod";
import { userFake } from "../mocks/fakeUsers";
import { expect } from "chai";

describe('Test User ', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('Test function createUserService', () => {
    it('should return user created', async () => {
      //Arrage
      const createUserStub = sandbox.stub(userMod, 'createUserModel');
      createUserStub.resolves(userFake);
      //Action
      const result = await createUserService('José Erivam', 'erivamdev@gmail.com', '123456');
      //Assert
      expect(result).to.deep.equal({ code: 201, resp: userFake.rows });
    });

  });
});
