import { createSandbox, SinonSandbox } from "sinon";
import * as userMod from "../../../src/models/user.mod";
import { userFake } from "../mocks/fakeUsers";
import * as jwt from "../../../src/utils/jwt";
import { loginService } from "../../../src/services/login.serv";
import { expect } from "chai";
describe('Test Login', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('Test function loginService', () => {
    it('when login with success', async () => {
      const searchEmailStub = sandbox.stub(userMod, 'searchEmail');
      searchEmailStub.resolves(userFake);
      const tokenStub = sandbox.stub(jwt, 'tokenGenerator');
      tokenStub.resolves('tokenfake');


      const result = await loginService('erivamdev@gmail.com', '123456');
      expect(result).to.deep.equal({
        code: 200, resp: {
          user: {
            id: 'fb66bf68-3cc1-427b-8951-2de7a6a8ca61',
            name: 'José Erivam',
            role: 'admin',
            email: 'erivamdev@gmail.com',
          }, token: 'tokenfake'
        }
      });
    });

    it('when password incorrect', async () => {
      const searchEmailStub = sandbox.stub(userMod, 'searchEmail');
      searchEmailStub.resolves(userFake);

      const result = await loginService('erivamdev@gmail.com', 'incorrect');
      expect(result).to.deep.equal({ code: 401, resp: { message: 'Incorrect username or password' } });
    });
  })
});
