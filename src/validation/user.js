import Joi from 'joi';

export const validationUserSchema = Joi.object({
  name: Joi.string().required(),
  jobTitle: Joi.string().required(),
  password: Joi.string().required(),
  placeOfWork: Joi.string().required(),
});

export const validationDailySummarySchema = Joi.object({
  numberAgzp: Joi.string().required(),
  date: Joi.string().min(8).max(12).required(),
  operatorName: Joi.string().required(),
  finalMeterReading: Joi.number().required(),
  price: Joi.number().required(),
  cashRegisterTotal: Joi.number().required(),
  f2Total: Joi.number().required(),
  accordingToContract: Joi.array().required(),
});
