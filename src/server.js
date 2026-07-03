import express from 'express';
import cors from 'cors';
import allRoutes from './routers/index.js';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT'));

const corsOptions = {
  // origin: 'http://localhost:5173',
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const serverSetap = () => {
  const app = express();

  app.use(
    express.json({ type: ['application/json', 'application/vnd.api+json'] }),
  );
  // app.use(cors(corsOptions));

  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use('/api', allRoutes);
  app.use('/api-docs', swaggerDocs());

  app.use('*splat', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};
