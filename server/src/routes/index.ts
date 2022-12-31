import login from './login.routes';
import transactions from './finace.routes';
import register from './user.routes';

const router = [
  transactions,
  register,
  login
];

export default router;