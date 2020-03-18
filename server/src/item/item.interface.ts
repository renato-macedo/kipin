import { Schema, Document, mongo } from 'mongoose';
import { ObjectID } from 'mongodb';
import { User } from '../user/user.interface';

export interface Item extends Document {
  title: string;
  body: string;
  user: User | ObjectID;
  previewTitle: string;
  previewURL: string;
  previewDescription: string;
}
