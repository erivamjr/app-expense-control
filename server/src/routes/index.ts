import login from './login.routes';
import transactions from './finace.routes';
import register from './user.routes';
import category from './category.routes';

const router = [
  transactions,
  register,
  login,
  category
];

export default router;