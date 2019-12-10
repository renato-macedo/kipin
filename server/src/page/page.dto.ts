import { IsUrl, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  caption?: string;
}

export class UpdatePageDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
  
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  caption: string;
}

export class PageParams {
  @IsNotEmpty()
  @IsMongoId()
  pageid: string;
}
