import { loginUser, logoutUser, registerUser } from '../services/auth.js';

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      userId: user.userId,
      name: user.name,
      jobTitle: user.jobTitle,
      placeOfWork: user.placeOfWork,
      accessToken: user.accessToken,
      accessTokenValideUntil: user.accessTokenValideUntil,
      refreshTokenValidUntile: user.refreshTokenValidUntile,
    },
  });
};

export const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'New user added!',
    data: newUser,
  });
};

export const logoutUserController = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    await logoutUser(token);
  }

  res.status(204).send();
};
