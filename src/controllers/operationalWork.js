import createHttpError from 'http-errors';
import {
  addingAGZP,
  allAgzp,
  allEmployees,
  deleteAgzp,
  deleteEmployeesById,
  employeesById,
  updateAgzp,
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
    message: 'One employees',
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
export const addingAGZPController = async (req, res, next) => {
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
  const result = await updateAgzp(agzpId, req.body);

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
