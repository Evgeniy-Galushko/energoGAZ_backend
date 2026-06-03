import createHttpError from 'http-errors';
import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const swaggerDocs = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    // console.log(swaggerDocs);
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocs)];
  } catch (err) {
    console.log(err);
    return (req, res, next) => {
      next(createHttpError(500, 'Can`t load swagger docs'));
    };
  }
};
