import { createSandbox, SinonSandbox } from "sinon";
import { createUserService, deleteUserService, getAllRegisterByUserService } from "../../../src/services/user.serv";
import * as userMod from "../../../src/models/user.mod";
import { userBodyFake, userFake } from "../mocks/fakeUsers";
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

    it('when don\'t return user', async () => {
      //Arrage
      const createUserStub = sandbox.stub(userMod, 'createUserModel');
      createUserStub.resolves(userFake.rowCount = 0);
      //Action
      const result = await createUserService('José Erivam', 'erivamdev@gmail.com', '123456');
      //Assert
      expect(result).to.deep.equal({ resp: { message: 'User not created in database' }, code: 400 });
    });
  });

  describe('Test function deleteUserService', () => {
    it('should return message user deleted', async () => {
      //Arrage
      const deleteUserStub = sandbox.stub(userMod, 'deleteUserModel');
      deleteUserStub.resolves(1);
      //Action
      const result = await deleteUserService('1', userBodyFake);
      //Assert
      expect(result).to.deep.equal({ resp: { message: 'User deleted' }, code: 200 });
    });

    it('when don\'t delete with success', async () => {
      //Arrage
      const deleteUserStub = sandbox.stub(userMod, 'deleteUserModel');
      deleteUserStub.resolves(0);
      //Action
      const result = await deleteUserService('1', userBodyFake);
      //Assert
      expect(result).to.deep.equal({ resp: { message: 'User not deleted in database' }, code: 400 });
    });

    it('when id is difer and don\'t is admin', async () => {
      //Arrage
      const deleteUserStub = sandbox.stub(userMod, 'deleteUserModel');
      deleteUserStub.resolves(1);
      //Action
      userBodyFake.id = '99'
      userBodyFake.role = 'user'
      const result = await deleteUserService('1', userBodyFake);
      //Assert
      expect(result).to.deep.equal({ resp: { message: 'Unauthorized' }, code: 401 });
    });

  });

  describe('Test function getAllRegisterByUserModel', () => {
    it('should return user', async () => {
      //Arrage
      const deleteUserStub = sandbox.stub(userMod, 'getAllRegisterByUserModel');
      deleteUserStub.resolves(userFake);
      //Action
      const result = await getAllRegisterByUserService('1');
      //Assert
      expect(result).to.deep.equal({ resp: userFake, code: 200 });
    });

    it('when don\'t return with success', async () => {
      //Arrage
      const deleteUserStub = sandbox.stub(userMod, 'getAllRegisterByUserModel');
      deleteUserStub.resolves(null);
      //Action
      const result = await getAllRegisterByUserService('1');
      //Assert
      expect(result).to.deep.equal({ resp: { message: 'User not found' }, code: 400 });
    });
  });
});
