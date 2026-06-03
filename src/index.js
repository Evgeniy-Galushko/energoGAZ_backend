import { initMongoDB } from './db/initMongoDB.js';
import { serverSetap } from './server.js';

const conectionServer = async () => {
  await initMongoDB();
  serverSetap();
};

conectionServer();
