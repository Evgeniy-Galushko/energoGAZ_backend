import Joi from 'joi';

export const validationAddedAgzpSchema = Joi.object({
  gasStationNumber: Joi.string().required(),
  address: Joi.string().required(),
  listOfEmployees: Joi.array().required(),
  fuelTanks: Joi.array().required(),
  dispenserName: Joi.string().required(),
  commissioningDate: Joi.string().required(),
  lastMaintenance: Joi.string().required(),
});

export const validationUpdatedAddedAgzpSchema = Joi.object({
  gasStationNumber: Joi.string(),
  address: Joi.string(),
  listOfEmployees: Joi.array(),
  fuelTanks: Joi.array(),
  dispenserName: Joi.string(),
  commissioningDate: Joi.string(),
  lastMaintenance: Joi.string(),
});
