import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import {
  isValidatDailyReportId,
  isValidateAgzpId,
  isValidateCompaniesId,
  isValidateId,
} from '../middlewares/isValidateId.js';
import {
  addingAGZPController,
  addingCompaniesController,
  allAgzpController,
  allCompaniesController,
  allEmployeesController,
  dailyReportAgzpController,
  dailyReportForAllTimeController,
  dailyReportForOneMonthController,
  dailyReportForOneYearController,
  deleteAgzpController,
  deleteCompanieController,
  deleteEmployeesByIdController,
  employeesByIdController,
  patchAgzpController,
  patchCompanieController,
  updateDailyReportAgzpController,
} from '../controllers/operationalWork.js';
import { authenticate } from '../middlewares/authenticate.js';
import { accessCheck } from '../middlewares/accessCheck.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  validationAddedAgzpSchema,
  validationAddingCompanies,
  validationDailyReportAgzp,
  validationUpdatedAddedAgzpSchema,
  validationUpdatedAddingCompanies,
  validationUpdatedDailyReportAgzp,
} from '../validation/operationalWork.js';

const router = Router();

router.use(authenticate);
// router.use(accessCheck);

//--------------Working with employees------------------------------------------
router.get('/allEmployees', accessCheck, ctrWrapper(allEmployeesController));
router.get(
  '/oneEmployees/:employeeId',
  isValidateId,
  accessCheck,
  ctrWrapper(employeesByIdController),
);
router.delete(
  '/deleteEmployees/:employeeId',
  isValidateId,
  accessCheck,
  ctrWrapper(deleteEmployeesByIdController),
);
//------------------------------------------------------------------------------

//-----------------Working with gas stations------------------------------------
router.post(
  '/addingAgzp',
  accessCheck,
  validateBody(validationAddedAgzpSchema),
  ctrWrapper(addingAGZPController),
);

router.get('/allAgzp', accessCheck, ctrWrapper(allAgzpController));

router.patch(
  '/updateAgzp/:agzpId',
  accessCheck,
  isValidateAgzpId,
  validateBody(validationUpdatedAddedAgzpSchema),
  ctrWrapper(patchAgzpController),
);

router.delete(
  '/deleteAgzp/:agzpId',
  accessCheck,
  isValidateAgzpId,
  ctrWrapper(deleteAgzpController),
);
//------------------------------------------------------------------------------

//--------------------Daily report from the gas station-------------------------
router.post(
  '/dailyReportAgzp',
  validateBody(validationDailyReportAgzp),
  ctrWrapper(dailyReportAgzpController),
);

router.patch(
  '/updateDailyReportAgzp/:dailyReportId',
  accessCheck,
  isValidatDailyReportId,
  validateBody(validationUpdatedDailyReportAgzp),
  ctrWrapper(updateDailyReportAgzpController),
);

router.get(
  '/dailyReportForOneMonth',
  accessCheck,
  ctrWrapper(dailyReportForOneMonthController),
);

router.get(
  '/dailyReportForOneYear',
  accessCheck,
  ctrWrapper(dailyReportForOneYearController),
);

router.get(
  '/dailyReportForAllTime',
  accessCheck,
  ctrWrapper(dailyReportForAllTimeController),
);

//------------------------------------------------------------------------------

//------------------------List of companies-------------------------------------
router.post(
  '/addingCompanies',
  accessCheck,
  validateBody(validationAddingCompanies),
  ctrWrapper(addingCompaniesController),
);
router.get('/allCompanies', accessCheck, ctrWrapper(allCompaniesController));

router.patch(
  '/updateCompanie/:companieId',
  accessCheck,
  isValidateCompaniesId,
  validateBody(validationUpdatedAddingCompanies),
  ctrWrapper(patchCompanieController),
);

router.delete(
  '/deleteCompanie/:companieId',
  accessCheck,
  isValidateCompaniesId,
  ctrWrapper(deleteCompanieController),
);
//------------------------------------------------------------------------------
export default router;
