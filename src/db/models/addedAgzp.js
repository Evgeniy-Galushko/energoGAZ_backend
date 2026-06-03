import { model, Schema } from 'mongoose';

const addingAgzpSchema = new Schema(
  {
    gasStationNumber: { type: String, required: true },
    address: { type: String, required: true },
    listOfEmployees: { type: Array, required: true },
    fuelTanks: { type: Array, required: true },
    dispenserName: { type: String, required: true },
    commissioningDate: { type: String, required: true },
    lastMaintenance: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AgzpCollection = model('agzplists', addingAgzpSchema);
