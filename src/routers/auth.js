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

const router = Router();

router.post(
  '/loginUser',
  validateBody(loginUserSchema),
  ctrWrapper(loginUserController),
);

router.post(
  '/registeUser',
  validateBody(validationUserSchema),
  ctrWrapper(registerUserController),
);

router.post('/logout', ctrWrapper(logoutUserController));

// router.post('/logout');

export default router;
