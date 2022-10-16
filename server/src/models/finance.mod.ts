import { client } from '../config/connections';

const listMovements = async () => {
  const result = await (await client).query('SELECT * FROM financial_control.finance') as any;
  return result.rows;
};

export { listMovements };
