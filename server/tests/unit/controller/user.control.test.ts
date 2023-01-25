import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { createUser } from '../../../src/controllers/user.controller';
import *  as userService from '../../../src/services/user.serv';
import { afterEach } from 'mocha';
import { userFake } from '../mocks/fakeUsers';

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

    it('when request incorrect body, return 400', async () => {
      response.status = sandbox.stub().returns(response);
      response.json = sandbox.stub().returns(response);
      request.body = {};
      await createUser(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
  });
});
