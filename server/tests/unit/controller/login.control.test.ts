import { SinonSandbox, createSandbox, assert } from 'sinon';
import { expect } from 'chai';
import { login } from '../../../src/controllers/login.control';
import * as loginServ from '../../../src/services/login.serv';
import { userBodyFake } from '../mocks/fakeUsers';

describe('Test Login of the controller layer', () => {
  const response = {} as any;
  const request = {} as any;
  request.body = {
    email: 'johndoe@gmail.com',
    password: 'passwordFake',
  };

  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the code 200 of login in controller', async () => {
    response.status = sandbox.stub().returns(response);
    response.json = sandbox.stub().returns(response);
    sandbox.stub(loginServ, 'loginService').resolves({ code: 200, resp: { user: userBodyFake, token: 'tokenFake' } });
    await login(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
    assert.calledOnce(response.status);
  });

  it('return array in format JSON', async () => {
    sandbox.stub(loginServ, 'loginService').resolves({ code: 200, resp: { user: userBodyFake, token: 'tokenFake' } });
    await login(request, response);
    expect(response.json.calledWith({ user: userBodyFake, token: 'tokenFake' })).to.be.equal(true);
  });

  it('when response null', async () => {
    sandbox.stub(loginServ, 'loginService').resolves({ code: 401, resp: { message: 'Incorrect username or password' } });
    await login(request, response);
    expect(response.status.calledWith(401)).to.be.equal(true);
  });

  it('when body incorrect', async () => {
    sandbox.stub(loginServ, 'loginService').resolves({ code: 400, resp: { message: 'Incorrect username or password' } });
    await login(request, response);
    expect(response.status.calledWith(400)).to.be.equal(true);
  });
});
