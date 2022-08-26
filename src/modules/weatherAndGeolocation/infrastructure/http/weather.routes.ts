import { Router } from 'express';
import { getWeatherCoordinatesFromAddressController } from '../../useCases/getWeatherfromTheAddress';
import { verifyToken } from '../../../../middlewares/auth';

const router = Router();
router.get('/', async (req, res) =>
  getWeatherCoordinatesFromAddressController.execute(req, res)
);

export { router as weatherRoute };
