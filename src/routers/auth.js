import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validationUserSchema } from '../validation/user.js';
import { loginUserSchema } from '../validation/auth.js';
import { authenticate } from '../middlewares/authenticate.js';
import { accessCheck } from '../middlewares/accessCheck.js';

const router = Router();

router.post(
  '/registeUser',
  authenticate,
  accessCheck,
  validateBody(validationUserSchema),
  ctrWrapper(registerUserController),
);

router.post(
  '/loginUser',
  validateBody(loginUserSchema),
  ctrWrapper(loginUserController),
);

router.post('/logout', authenticate, ctrWrapper(logoutUserController));

// router.post('/logout');

export default router;
