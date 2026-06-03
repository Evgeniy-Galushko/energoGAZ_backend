import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, required: true },
    jobTitle: {
      type: String,
      required: true,
      enum: ['оператор', 'директор', 'бухгалтер', 'менеджер'],
    },
    placeOfWork: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValideUntil: { type: Date, required: true },
    refreshTokenValidUntile: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionCollection = model('sessions', sessionsSchema);
