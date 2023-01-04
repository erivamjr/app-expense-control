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

export const createUserModel = async (id: string, name: string, email: string, password: string) => {

  const results = await (await client).query(
    `INSERT INTO 
    users (id, name, role, email, password, created_at)   
    SELECT $1, $2,         
    CASE WHEN (SELECT TRUE FROM users WHERE role = 'admin')     
    THEN 'user' ELSE 'admin' END,
        $3, $4, $5
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = $6) RETURNING *`,
    [id, name, email, password, new Date(), email],
  );
  return results;
};

export const deleteUserModel = async (id: string) => {
  const result = await (await client).query(`DELETE FROM
  users 
  WHERE 
  id = $1 RETURNING *`,
    [id],
  );
  return result.rowCount;
}