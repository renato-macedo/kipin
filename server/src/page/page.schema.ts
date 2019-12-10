import { Schema } from 'mongoose';

export const PageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: String,
    
    caption: String,

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  },
);
