import sinon from 'sinon';
import { expect } from 'chai';
import { Pool } from 'pg';

import { listMovements } from '../../../src/models/finance.mod';
import { client } from '../../../src/config/connections';
const pool = new Pool();
describe('Busca os produtos do banco', () => {
  describe('Quando não existir nenhuma transação cadastrada', () => {
    beforeEach(async () => {
      // sinon substitui na connections a propriedade chamada execute por uma função que vira um array de produtos vazio
      sinon.stub(await client, 'query').resolves({
        rows: [],
      });
    });
    afterEach(() => {
      // se o ite acabou restaura o comportamento original do execute
      sinon.restore();
    });

    it('Verifica se é uma função', () => {
      expect(listMovements).to.be.a('function');
    })

    it('retorna um array', async () => {
      const result = await listMovements();
      expect(result).to.be.an('array')
    });
    it('o array esta vazio', async () => {
      const result = await listMovements();
      // espero que o resultado seja vazio
      expect(result).to.be.empty;
    });
  });
});