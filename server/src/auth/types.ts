import { IsEmail } from 'class-validator';

export class ResetDto {
  @IsEmail()
  readonly email: string;
}

export interface TokenPayload {
  email?: string;
  sub?: string;
}
