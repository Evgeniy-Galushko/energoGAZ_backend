import { model, Schema } from 'mongoose';

const addingCompaniesSchema = new Schema(
  {
    name: { type: String, required: true },
    codeEDRPOU: { type: String, required: true },
    individualTaxNumber: { type: String, required: true },
    typeOfLegalEntity: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    discount: { type: Number, required: true },
    contractNumber: { type: String, required: true },
    durationOfTheContract: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CollectionCompanies = model('companies', addingCompaniesSchema);
