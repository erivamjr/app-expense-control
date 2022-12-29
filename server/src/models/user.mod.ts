import { client } from '../config/connections';
export const searchEmail = async (email: string) => {
  const result = await (await client).query(`SELECT * FROM
  users 
  WHERE 
  email = $1`,
    [email],
  ) as any;
  return result;
};

export const searchRole = async (role: string) => {
  const result = await (await client).query(`SELECT * FROM
  users 
  WHERE 
  role = $1`,
    [role],
  ) as any;
  return result.rowCount;
};


export const createUserModel = async (id: string, name: string, role: string, email: string, password: string) => {

  const results = await (await client).query(
    `INSERT INTO 
    users (id, name, role, email, password) 
    VALUES 
    ( $1,$2,$3,$4,$5 )`,
    [id, name, role, email, password],
  );
  return results.rowCount;
};