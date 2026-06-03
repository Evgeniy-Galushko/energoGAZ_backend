import { AgzpCollection } from '../db/models/addedAgzp.js';
import { SessionCollection } from '../db/models/session.js';
import { userCollection } from '../db/models/user.js';

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

  const agzp = await AgzpCollection.create({
    ...req.body,
    userId: session.userId,
  });

  return agzp;
};

export const allAgzp = async () => {
  return await AgzpCollection.find();
};

export const updateAgzp = async (agzpId, payload, options = {}) => {
  const updateResult = await AgzpCollection.findOneAndUpdate(
    { _id: agzpId },
    payload,
    {
      returnDocument: 'after',
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!updateAgzp || !updateResult.value) return null;

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
