import { Router } from 'express';
import { getAddressValidatedController } from '../../useCases/indext';

const router = Router();

router.get('/', async (req, res) =>
  getAddressValidatedController.execute(req, res)
);

export { router as ValidateAddressRouter };
