import { IsEmail, IsJWT } from 'class-validator';

export class ResetDto {
  @IsEmail()
  readonly email: string;
}

export interface TokenPayload {
  email?: string;
  sub?: string;
}

export class RefreshTokenDTO {
  @IsJWT()
  readonly token: string;

  @IsEmail()
  readonly email: string;
}
