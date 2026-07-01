import createHttpError from 'http-errors';
import {
  addingAGZP,
  addingCompanies,
  allAgzp,
  allCompanies,
  allDailyReport,
  allEmployees,
  dailyReportAgzp,
  dailyReportForOneMont,
  dailyReportForOneYear,
  deleteAgzp,
  deleteCompanie,
  deleteEmployeesById,
  employeesById,
  updateAgzp,
  updateCompanie,
  updateDailyReportAgzp,
} from '../services/operationalWork.js';

//-----------------Working with employees---------------------------------------
export const allEmployeesController = async (req, res) => {
  const users = await allEmployees();

  res.json({
    status: 200,
    message: 'All employeess',
    data: users,
  });
};

export const employeesByIdController = async (req, res, next) => {
  const { employeeId } = req.params;
  const employee = await employeesById(employeeId);

  if (!employee) {
    next(createHttpError(404, 'Employees not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Data about one employee',
    data: employee,
  });
};

export const deleteEmployeesByIdController = async (req, res, next) => {
  const { employeeId } = req.params;
  const employee = await deleteEmployeesById(employeeId, req);

  if (!employee) {
    next(createHttpError(404, 'Employees not found'));
    return;
  }

  res.status(204).send();
};
//------------------------------------------------------------------------------

//-----------------Working with gas stations------------------------------------
export const addingAGZPController = async (req, res) => {
  const newAgzp = await addingAGZP(req);

  res.json({
    status: 201,
    message: 'AGZP added',
    data: newAgzp,
  });
};

export const allAgzpController = async (req, res) => {
  const agzp = await allAgzp();

  res.json({
    status: 200,
    message: 'All AGZP',
    data: agzp,
  });
};

export const patchAgzpController = async (req, res, next) => {
  const { agzpId } = req.params;
  const result = await updateAgzp(req, agzpId, req.body);

  if (!result) {
    next(createHttpError(404, 'No such AGZP found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Data on the gas station has been updated',
    data: result.agzp,
  });
};

export const deleteAgzpController = async (req, res, next) => {
  const { agzpId } = req.params;
  const result = await deleteAgzp(agzpId);

  if (!result) {
    next(createHttpError(404, 'No such AGZP found'));
    return;
  }

  res.status(204).send();
};

//------------------------------------------------------------------------------

//--------------------Daily report from the gas station-------------------------
export const dailyReportAgzpController = async (req, res) => {
  const dailyReport = await dailyReportAgzp(req);

  // console.log(dailyReport);

  res.json({
    status: 201,
    message: 'Daily report created',
    data: dailyReport,
  });
};

export const updateDailyReportAgzpController = async (req, res, next) => {
  const { dailyReportId } = req.params;
  const payload = req.body;

  const result = await updateDailyReportAgzp(req, dailyReportId, payload);
  console.log(result);

  if (!result) {
    next(createHttpError(404, 'No such report found.'));
    return;
  }

  res.json({
    status: 200,
    message: 'Daily report data has been updated.',
    data: result.dailyReport,
  });
};

export const dailyReportForOneMonthController = async (req, res) => {
  const { oneMonth, gasStationNumber } = req.query;

  if (oneMonth.length < 7 || oneMonth.length > 7) {
    throw createHttpError(
      404,
      'Incorrect date! Date must match this format "2025-03"!',
    );
  }

  const oneMonthReport = await dailyReportForOneMont(
    oneMonth,
    gasStationNumber,
  );

  oneMonthReport.length === 0
    ? res.json({
        status: 200,
        message: 'No records for this period',
        data: oneMonthReport,
      })
    : res.json({
        status: 200,
        message: 'Daily report for one month',
        data: oneMonthReport,
      });
};

export const dailyReportForOneYearController = async (req, res) => {
  const { oneYear, gasStationNumber } = req.query;
  if (oneYear.length < 4 || oneYear.length > 4) {
    throw createHttpError(
      404,
      'Incorrect date! Date must match this format "2025"!',
    );
  }

  const result = await dailyReportForOneYear(oneYear, gasStationNumber);

  result.length === 0
    ? res.json({
        status: 200,
        message: 'No records for this period',
        data: result,
      })
    : res.json({
        status: 200,
        message: 'Daily report for one year',
        data: result,
      });
};

export const dailyReportForAllTimeController = async (req, res) => {
  const result = await allDailyReport();

  res.json({
    status: 200,
    message: 'Result for the entire period of work',
    data: result,
  });
};

//------------------------------------------------------------------------------

//------------------------List of companies-------------------------------------
export const addingCompaniesController = async (req, res) => {
  const companie = await addingCompanies(req);

  res.json({
    status: 201,
    message: 'The company has been added',
    data: companie,
  });
};

export const allCompaniesController = async (req, res) => {
  const companies = await allCompanies();

  res.json({
    status: 200,
    message: 'All Companies',
    data: companies,
  });
};

export const patchCompanieController = async (req, res, next) => {
  const { companieId } = req.params;
  const update = await updateCompanie(req, companieId, req.body);

  if (!update) {
    next(createHttpError(404, 'No such company was found.'));
    return;
  }

  res.json({
    status: 200,
    message: 'Company information has been updated.',
    data: update.companie,
  });
};

export const deleteCompanieController = async (req, res, next) => {
  const { companieId } = req.params;
  const result = await deleteCompanie(companieId);

  if (!result) {
    next(createHttpError(404, 'No such company was found.'));
    return;
  }

  res.status(204).send();
};
//------------------------------------------------------------------------------
