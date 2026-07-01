import { AgzpCollection } from '../db/models/addedAgzp.js';
import { CollectionCompanies } from '../db/models/addingCompanie.js';
import { DailyReportCollection } from '../db/models/dailyReport.js';
import { SessionCollection } from '../db/models/session.js';
import { userCollection } from '../db/models/user.js';
import { dateConversion } from '../utils/dateConversion.js';

//-----------------Working with employees---------------------------------------
export const allEmployees = async (req) => {
  const allUsers = await userCollection.find();

  return allUsers;
};

export const employeesById = async (employeeId) => {
  const employee = await userCollection.findById(employeeId);

  return employee;
};

export const deleteEmployeesById = async (employeeId) => {
  const employee = await userCollection.findOneAndDelete({ _id: employeeId });

  return employee;
};
//------------------------------------------------------------------------------

//-----------------Working with gas stations------------------------------------
export const addingAGZP = async (req) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId, name } = session;

  const agzp = await AgzpCollection.create({
    ...req.body,
    userId: userId,
    userName: name,
  });

  return agzp;
};

export const allAgzp = async () => {
  return await AgzpCollection.find();
};

export const updateAgzp = async (req, agzpId, payload, options = {}) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId, name } = session;

  const updateResult = await AgzpCollection.findOneAndUpdate(
    { _id: agzpId },
    { ...payload, userId: userId, userName: name },
    {
      returnDocument: 'after',
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updateResult || !updateResult.value) return null;

  return {
    agzp: updateResult.value,
    isNew: Boolean(updateResult?.lastErrorObject.upserted),
  };
};

export const deleteAgzp = async (agzpId) => {
  const delAgzp = await AgzpCollection.findOneAndDelete({ _id: agzpId });

  return delAgzp;
};
//------------------------------------------------------------------------------

//--------------------Daily report from the gas station-------------------------
export const dailyReportAgzp = async (req) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId } = session;

  console.log(req.body);

  const report = await DailyReportCollection.create({
    ...req.body,
    operatorId: userId,
    userUpdatedId: userId,
    userUpdatedName: '',
  });

  return report;
};

export const updateDailyReportAgzp = async (
  req,
  dailyReportId,
  payload,
  options = {},
) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId, name } = session;
  // console.log(userId, name);

  const updateResult = await DailyReportCollection.findOneAndUpdate(
    { _id: dailyReportId },
    { ...payload, userUpdatedId: userId, userUpdatedName: name },
    {
      returnDocument: 'after',
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updateResult || !updateResult.value) return null;

  return {
    dailyReport: updateResult.value,
    isNew: Boolean(updateResult?.lastErrorObject.upserted),
  };

  // return updated
};

export const dailyReportForOneMont = async (oneMonth, gasStationNumber) => {
  const { beginningOfPeriod, endOfPeriod } = dateConversion(oneMonth);

  // const reportForOneMonth = await DailyReportCollection.find({
  // numberAgzp: { $eq: gasStationNumber },
  // })
  // .where('date')
  // .gte(beginningOfPeriod)
  // .lte(endOfPeriod)
  // .sort({ date: 'asc' });

  const reportForOneMonth = await DailyReportCollection.find({
    numberAgzp: gasStationNumber,
    date: {
      $gte: beginningOfPeriod,
      $lte: endOfPeriod,
    },
  }).sort({ date: 'asc' });

  return reportForOneMonth;
};

export const dailyReportForOneYear = async (oneYear, gasStationNumber) => {
  const { beginningOfTheYear, endOfTheYear } = dateConversion(oneYear);
  console.log(beginningOfTheYear, endOfTheYear);

  const year = await DailyReportCollection.find({
    numberAgzp: gasStationNumber,
    date: {
      $gte: beginningOfTheYear,
      $lte: endOfTheYear,
    },
  }).sort({ date: 'asc' });

  return year;
};

export const allDailyReport = async () => {
  const allReport = await DailyReportCollection.find().sort({ date: 'asc' });

  return allReport;
};
//------------------------------------------------------------------------------

//------------------------List of companies-------------------------------------
export const addingCompanies = async (req) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId, name } = session;

  const companie = await CollectionCompanies.create({
    ...req.body,
    userId: userId,
    userName: name,
  });

  return companie;
};

export const allCompanies = async () => {
  return await CollectionCompanies.find();
};

export const updateCompanie = async (
  req,
  companieId,
  payload,
  options = {},
) => {
  const authToken = req.get('Authorization');
  const token = authToken.split(' ')[1];
  const session = await SessionCollection.findOne({ accessToken: token });
  const { userId, name } = session;

  const updateResult = await CollectionCompanies.findOneAndUpdate(
    { _id: companieId },
    { ...payload, userId: userId, userName: name },
    {
      returnDocument: 'after',
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updateResult || !updateResult.value) return null;

  return {
    companie: updateResult.value,
    isNew: Boolean(updateResult?.lastErrorObject.upserted),
  };
};

export const deleteCompanie = async (companieId) => {
  const deleteCompanie = await CollectionCompanies.findOneAndDelete({
    _id: companieId,
  });

  return deleteCompanie;
};
//------------------------------------------------------------------------------
