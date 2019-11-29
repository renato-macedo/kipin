import { Schema } from 'mongoose';

export const PageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    caption: String,
  },
  {
    timestamps: true,
  },
);
