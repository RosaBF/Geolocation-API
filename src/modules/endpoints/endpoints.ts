import { Router } from 'express';
import { verifyToken } from '../../middlewares/auth';
import { validateUserCredentials } from '../../middlewares/userCredentials';
import { getUsersController } from '../user/useCases/getUsers';
import { loginUserController } from '../user/useCases/loginUser/index';
import { registerUserController } from '../user/useCases/registerUser/index';
import { getAddressValidatedController } from '../validateAddressIsReal/useCases/index';
import { getWeatherCoordinatesFromAddressController } from '../weatherAndGeolocation/useCases/getWeatherfromTheAddress';

const router = Router();

//Get user
router.get('/', async (req, res) => getUsersController.execute(req, res));

// Get auth token for login
router.post('/login', verifyToken, async (req, res) =>
  loginUserController.execute(req, res)
);

//Create user
router.post('/register', async (req, res) =>
  registerUserController.execute(req, res)
);

// Get address validated
router.get('/address', (req, res) =>
  getAddressValidatedController.execute(req, res)
);

// Get weather coordinates given an address
router.get('/', verifyToken, validateUserCredentials, async (req, res) =>
  getWeatherCoordinatesFromAddressController.execute(req, res)
);
