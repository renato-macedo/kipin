import { Document } from 'mongoose';
import { Page } from '../page/page.interface';

export interface User extends Document {
  name: string;
  email: string;
  readonly password: string;
  pages: Page[];
}
