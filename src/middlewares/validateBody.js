import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, resizeBy, next) => {
  try {
    schema.validateAsync(req.body, { abortErly: false });

    next();
  } catch (err) {
    const error = createHttpError(404, 'Bad Request', { errors: err.datails });
    next(error);
  }
};
