import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { COMPANY_POSITIONS } from '../constants/index.js';

export const accessCheck = async (req, res, next) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];

  if (!token) {
    next(createHttpError(401, 'No token'));
  }

  const session = await SessionCollection.findOne({ accessToken: token });
  const { jobTitle } = session;
  // console.log(jobTitle);

  if (jobTitle === 'оператор' && COMPANY_POSITIONS.includes(session.jobTitle)) {
    next(createHttpError(401, 'Access denied'));
  }

  next();
};
