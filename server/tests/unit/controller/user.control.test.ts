import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { createUser, deleteUser, getAllRegisterByUser } from '../../../src/controllers/user.controller';
import *  as userService from '../../../src/services/user.serv';
import { afterEach } from 'mocha';
import { userBodyFake, userData, userFake } from '../mocks/fakeUsers';

describe('UserService', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Test createUser of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {
      name: "Jhon Doe",
      email: "jhondoe@postgres.com",
      password: "jho123"
    };

    it('should return the code 201 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'createUserService').resolves({
        code: 201, resp: userFake.rows[0]
      });
      await createUser(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('when return success, should return JSON', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'createUserService').resolves({
        code: 201, resp: userFake.rows[0]
      });
      await createUser(request, response);
      expect(response.json.calledWith(userFake.rows[0])).to.be.equal(true);
    });

    it('when request incorrect body, return 400', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      request.body = {};
      await createUser(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });

  describe('Test deleteUser of the controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = { user: { ...userBodyFake } };

    request.params = { id: '1' };

    it('should return the code 200 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'deleteUserService').resolves({
        code: 200, resp: { message: 'User deleted' }
      });
      await deleteUser(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('when return success, should return JSON', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'deleteUserService').resolves({
        code: 200, resp: { message: 'User deleted' }
      });
      await deleteUser(request, response);
      expect(response.json.calledWith({ message: 'User deleted' })).to.be.equal(true);
    });

    it('when not extist user in body', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      request.body = {};
      await deleteUser(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });

  describe('Test getAllRegisterByUser in controller layer', () => {
    const response = {} as any;
    const request = {} as any;
    request.body = {};
    request.body.user = { ...userBodyFake }

    it('should return the code 200 of finance in controller', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'getAllRegisterByUserService').resolves({
        code: 200, resp: { ...userData }
      });
      await getAllRegisterByUser(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('when return success, should return JSON', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'getAllRegisterByUserService').resolves({
        code: 200, resp: { ...userData }
      });
      await getAllRegisterByUser(request, response);
      expect(response.json.calledWith({ ...userData })).to.be.equal(true);
    });

    it('when return is null', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      sandbox.stub(userService, 'getAllRegisterByUserService').resolves({
        code: 400, resp: { message: 'User not found' }
      });
      await getAllRegisterByUser(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });
});

