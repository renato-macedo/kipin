import { Schema, Document } from 'mongoose';

export interface Page extends Document {
  url: string;
  caption: string;
}
