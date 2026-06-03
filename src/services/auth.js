import createHttpError from 'http-errors';
import { userCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { THIRTY_MINUTES, TWELVE_HOURS } from '../constants/index.js';

export const loginUser = async (payload) => {
  console.log(payload);
  const user = await userCollection.findOne({ name: payload.name });
  if (!user) {
    throw createHttpError(404, 'operator not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    name: user.name,
    jobTitle: user.jobTitle,
    placeOfWork: user.placeOfWork,
    accessToken,
    refreshToken,
    accessTokenValideUntil: new Date(Date.now() + THIRTY_MINUTES),
    refreshTokenValidUntile: new Date(Date.now() + TWELVE_HOURS),
  });
};

export const registerUser = async (payload) => {
  const newUser = await userCollection.findOne({ name: payload.name });

  if (newUser) {
    throw createHttpError(409, 'Name in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 12);

  return await userCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const logoutUser = async (token) => {
  const session = await SessionCollection.findOne({ accessToken: token });

  await SessionCollection.deleteOne({ _id: session._id });
};
