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
    });
  });
});