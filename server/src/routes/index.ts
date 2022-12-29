import login from './login.routes';
import list from './finace.routes';
import register from './user.routes';

const router = [
  list,
  register,
  login
];

export default router;