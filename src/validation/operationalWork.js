import Joi from 'joi';

export const validationAddedAgzpSchema = Joi.object({
  gasStationNumber: Joi.string().required(),
  typeOfFuel: Joi.array().required(),
  address: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  listOfEmployees: Joi.array().required(),
  fuelTanks: Joi.array().required(),
  dispenserName: Joi.string().required(),
  commissioningDate: Joi.string().required(),
  lastMaintenance: Joi.string().required(),
});

export const validationUpdatedAddedAgzpSchema = Joi.object({
  gasStationNumber: Joi.string(),
  typeOfFuel: Joi.array(),
  address: Joi.string(),
  phoneNumber: Joi.string(),
  listOfEmployees: Joi.array(),
  fuelTanks: Joi.array(),
  dispenserName: Joi.string(),
  commissioningDate: Joi.string(),
  lastMaintenance: Joi.string(),
});

export const validationDailyReportAgzp = Joi.object({
  numberAgzp: Joi.string().required(),
  date: Joi.string().required(),
  operatorName: Joi.string().required(),
  typeOfFuel: Joi.string().required(),
  fuelArrival: Joi.array(),
  noteForFuelArrival: Joi.string().empty('').default(''), //empty('').default('') или .allow('') разрешает сохранение пустой строки
  initialCounterValue1: Joi.number().required(),
  finalMeterReading1: Joi.number().required(),
  initialCounterValue2: Joi.number().empty('').default(''),
  finalMeterReading2: Joi.number().empty('').default(''),
  fuelResidues: Joi.array(),
  noteOnFuelRemaining: Joi.string().empty('').default(''),
  price: Joi.number().required(),
  cashRegisterTotal: Joi.number().required(),
  byTerminal: Joi.number().required(),
  litersByCashRegister: Joi.number().required(),
  f2Total: Joi.number().required(),
  litersByF2: Joi.number().required(),
  accordingToContract: Joi.array(),
  fuelForTheOffice: Joi.number(),
  noteForFuelForTheOffice: Joi.string().empty('').default(''), //empty('').default('') или .allow('') разрешает сохранение пустой строки
});

export const validationUpdatedDailyReportAgzp = Joi.object({
  numberAgzp: Joi.string(),
  date: Joi.string(),
  operatorName: Joi.string(),
  typeOfFuel: Joi.string(),
  fuelArrival: Joi.array(),
  noteForFuelArrival: Joi.string().empty('').default(''), //empty('').default('') или .allow('') разрешает сохранение пустой строки
  initialCounterValue1: Joi.number(),
  finalMeterReading1: Joi.number(),
  initialCounterValue2: Joi.number().empty('').default(''),
  finalMeterReading2: Joi.number().empty('').default(''),
  fuelResidues: Joi.array(),
  noteOnFuelRemaining: Joi.string().empty('').default(''),
  price: Joi.number(),
  cashRegisterTotal: Joi.number(),
  byTerminal: Joi.number(),
  litersByCashRegister: Joi.number(),
  f2Total: Joi.number(),
  litersByF2: Joi.number(),
  accordingToContract: Joi.array(),
  fuelForTheOffice: Joi.number(),
  noteForFuelForTheOffice: Joi.string().empty('').default(''), //empty('').default('') или .allow('') разрешает сохранение пустой строки
});

export const validationAddingCompanies = Joi.object({
  name: Joi.string().required(),
  codeEDRPOU: Joi.number().required(),
  individualTaxNumber: Joi.number().required(),
  typeOfLegalEntity: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  discount: Joi.number().required(),
  contractNumber: Joi.string().required(),
  durationOfTheContract: Joi.string().required(),
});

export const validationUpdatedAddingCompanies = Joi.object({
  name: Joi.string(),
  codeEDRPOU: Joi.number(),
  individualTaxNumber: Joi.number(),
  typeOfLegalEntity: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  discount: Joi.number(),
  contractNumber: Joi.string(),
  durationOfTheContract: Joi.string(),
});
