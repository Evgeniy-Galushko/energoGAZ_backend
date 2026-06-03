import { model, Schema } from 'mongoose';

const dailySummarySchema = new Schema(
  {
    // name: { type: String, required: true },
    // password: { type: String, required: true },
    // numberAgzp: { type: String, required: true },
    // userId: { type: Schema.Types.ObjectId, ref: 'users' },
    underContract: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OperatorCollection = model('dailySummary', dailySummarySchema);
