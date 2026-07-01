import { model, Schema } from 'mongoose';

const dailyReportSchema = new Schema(
  {
    numberAgzp: { type: String, required: true },
    date: { type: String, required: true },
    operatorName: { type: String, required: true },
    typeOfFuel: { type: String, required: true },
    operatorId: { type: Schema.Types.ObjectId, ref: 'users' },
    fuelArrival: { type: Array, required: false },
    noteForFuelArrival: { type: String, required: false },
    initialCounterValue1: { type: Number, required: true },
    finalMeterReading1: { type: Number, required: false },
    initialCounterValue2: { type: Number, required: false },
    finalMeterReading2: { type: Number, required: true },
    fuelResidues: { type: Array, required: false },
    noteOnFuelRemaining: { type: String, required: false },
    price: { type: Number, required: true },
    cashRegisterTotal: { type: Number, required: true },
    byTerminal: { type: Number, required: true },
    litersByCashRegister: { type: Number, required: true },
    f2Total: { type: Number, required: true },
    litersByF2: { type: Number, required: true },
    accordingToContract: { type: Array, required: false },
    fuelForTheOffice: { type: Number, required: false },
    noteForFuelForTheOffice: { type: String, required: false },
    userUpdatedId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    userUpdatedName: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const DailyReportCollection = model('dailySummarys', dailyReportSchema);
