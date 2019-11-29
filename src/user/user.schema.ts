import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    pages: [
      {
        page: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Page',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
