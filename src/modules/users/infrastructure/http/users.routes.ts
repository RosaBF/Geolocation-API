import { Router } from 'express';
import { verifyToken } from '../../../../middlewares/auth';
import { getUsersController } from '../../useCases/getUsers/index';
import { loginUserController } from '../../useCases/loginUser/index';
import { registerUserController } from '../../useCases/registerUser/index';

const router = Router();

router.get('/', async (req, res) => getUsersController.execute(req, res));
router.post('/login', async (req, res) =>
  loginUserController.execute(req, res)
);
router.post('/register', async (req, res) =>
  registerUserController.execute(req, res)
);

export { router as userRouter };
