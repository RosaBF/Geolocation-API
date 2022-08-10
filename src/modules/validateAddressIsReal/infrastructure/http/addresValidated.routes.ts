import { Router } from 'express';
import { getAddressValidatedController } from '../../useCases/index';

const router = Router();

router.get('/', async (req, res) =>
  getAddressValidatedController.execute(req, res)
);

export { router as validateAddressRouter };
