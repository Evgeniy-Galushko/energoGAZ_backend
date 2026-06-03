import Joi from 'joi';

export const loginUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  placeOfWork: Joi.string().required(),
});
