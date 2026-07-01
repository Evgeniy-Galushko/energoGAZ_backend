import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidateId = (req, res, next) => {
  const { employeeId, agzpId } = req.params;

  if (!isValidObjectId(employeeId)) {
    throw createHttpError(400, 'Bad Request');
  }

  // if (!isValidObjectId(agzpId)) {
  //   throw createHttpError(400, 'Bad Request');
  // }

  next();
};

export const isValidateAgzpId = (req, res, next) => {
  const { agzpId } = req.params;

  if (!isValidObjectId(agzpId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

export const isValidateCompaniesId = (req, res, next) => {
  const { companieId } = req.params;

  if (!isValidObjectId(companieId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

export const isValidatDailyReportId = (req, res, next) => {
  const { dailyReportId } = req.params;

  if (!isValidObjectId(dailyReportId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
