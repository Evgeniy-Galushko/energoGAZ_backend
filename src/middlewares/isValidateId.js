import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidateId = (req, res, next) => {
  const { employeeId, agzpId } = req.params;

  if (!isValidObjectId(employeeId) || !isValidObjectId(agzpId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};

export const isValidateAgzpId = (req, res, next) => {
  const { agzpId } = req.params;

  if (!isValidObjectId(agzpId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
