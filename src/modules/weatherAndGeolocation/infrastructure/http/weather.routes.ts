import { Router } from 'express';
import { getWeatherCoordinatesFromAddressController } from '../../useCases/getWeatherfromTheAddress';
import { verifyToken } from '../../../../middlewares/auth';
import { validateUserCredentials } from '../../../../middlewares/userCredentials';

const router = Router();
router.get('/', verifyToken, validateUserCredentials, async (req, res) =>
  getWeatherCoordinatesFromAddressController.execute(req, res)
);

export { router as weatherRoute };
