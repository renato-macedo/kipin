import { Schema } from 'mongoose';

export const ItemSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    title: String,

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    previewTitle: String,
    previewURL: String,
    previewDescription: String,
  },

  {
    timestamps: true,
  },
);
