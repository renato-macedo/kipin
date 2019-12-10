import { Schema, Document } from 'mongoose';
import { User } from '../user/user.interface';
export interface Item extends Document {
  title: string;
  body: string;
  user: User;
}
