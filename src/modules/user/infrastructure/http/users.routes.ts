import { Router } from 'express';
import { getUsersController } from '../../useCases/getUsers';
import { loginUserController } from '../../useCases/loginUser';

const router = Router();

router.get('/', async (req, res) => getUsersController.execute(req, res));
router.post('/login', async (req, res) => loginUserController.execute(req, res))

export { router as userRouter };
