import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { isValidateAgzpId, isValidateId } from '../middlewares/isValidateId.js';
import {
  addingAGZPController,
  allAgzpController,
  allEmployeesController,
  deleteAgzpController,
  deleteEmployeesByIdController,
  employeesByIdController,
  patchAgzpController,
} from '../controllers/operationalWork.js';
import { authenticate } from '../middlewares/authenticate.js';
import { accessCheck } from '../middlewares/accessCheck.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  validationAddedAgzpSchema,
  validationUpdatedAddedAgzpSchema,
} from '../validation/operationalWork.js';

const router = Router();

router.use(authenticate);
router.use(accessCheck);

//--------------Working with employees------------------------------------------
router.get('/allEmployees', ctrWrapper(allEmployeesController));
router.get(
  '/oneEmployees/:employeeId',
  isValidateId,
  ctrWrapper(employeesByIdController),
);
router.delete(
  '/deleteEmployees/:employeeId',
  isValidateId,
  ctrWrapper(deleteEmployeesByIdController),
);
//------------------------------------------------------------------------------

//-----------------Working with gas stations------------------------------------
router.post(
  '/addingAgzp',
  validateBody(validationAddedAgzpSchema),
  ctrWrapper(addingAGZPController),
);

router.get('/allAgzp', ctrWrapper(allAgzpController));

router.patch(
  '/updateAgzp/:agzpId',
  isValidateAgzpId,
  validateBody(validationUpdatedAddedAgzpSchema),
  ctrWrapper(patchAgzpController),
);

router.delete(
  '/deleteAgzp/:agzpId',
  isValidateAgzpId,
  ctrWrapper(deleteAgzpController),
);
//------------------------------------------------------------------------------

export default router;
