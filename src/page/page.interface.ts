import { Schema, Document } from 'mongoose';
import { User } from '../user/user.interface';
export interface Page extends Document {
  url: string;
  caption: string;
  user: User;
}
