import { expect } from 'chai';
import sinon, { createSandbox, SinonSandbox } from 'sinon';
import jsonwebtoken from 'jsonwebtoken';
import { tokenGenerator, TokenPayloadProps } from '../../../src/utils/jwt';


describe('tokenGenerator', () => {
  let sandbox: SinonSandbox;
  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should generate a token with correct payload', async () => {
    const payload: TokenPayloadProps = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    };

    const secretKey = 'secret_key';
    process.env.JWT_SECRET = secretKey;

    const signStub = sandbox.stub(jsonwebtoken, 'sign').resolves('token');
    const token = await tokenGenerator(payload);

    expect(token).to.equal('token');
    expect(signStub.calledWith({ ...payload }, secretKey, { expiresIn: '30d' })).to.be.true;
  });

  it('should throw error if JWT_SECRET is not defined', async () => {
    const payload: TokenPayloadProps = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    };

    delete process.env.JWT_SECRET;

    try {
      await tokenGenerator(payload);
    } catch (error: any) {
      expect(error.message).to.equal('JWT_SECRET is not defined in .env file');
    }
  });
});
