import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    jobTitle: {
      type: String,
      required: true,
      enum: ['оператор', 'директор', 'бухгалтер', 'менеджер'],
    },
    password: { type: String, required: true },
    placeOfWork: {
      type: String,
      required: true,
      enum: [
        'офис',
        'agzp_1',
        'agzp_2',
        'agzp_3',
        'agzp_4',
        'agzp_5',
        'agzp_6',
        'agzp_7',
      ],
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const userCollection = model('users', userSchema);
