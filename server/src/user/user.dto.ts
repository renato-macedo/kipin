import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({})
  @IsString()
  @Length(6, 18)
  readonly password: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Email is not valid' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  readonly password: string;
}
