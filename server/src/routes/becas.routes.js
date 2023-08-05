import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getBecas,
  getBeca,
  createBeca,
  updateBeca,
  deleteBeca,
} from '../controllers/beca.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createBecaSchema } from '../schemas/beca.schema.js';

const router = new Router();

router.get('/becas', getBecas);
router.get('/becas/:id', authRequired, getBeca);
router.post(
  '/becas',
  authRequired,
  validateSchema(createBecaSchema),
  createBeca
);
router.delete('/becas/:id', authRequired, deleteBeca);
router.put('/beca/:id', authRequired, updateBeca);

export default router;
