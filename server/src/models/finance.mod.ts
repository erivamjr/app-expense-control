import { connection } from '../config/connections';

const listMovements = async () => {
  const result = await connection.query('SELECT * FROM financial_control.finance');
  return result;
};

export { listMovements };
