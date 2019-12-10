import { IsUrl, IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsUrl()
  body: string;

  @IsNotEmpty()
  @IsString()
  title: string;

}

export class UpdateItemDto {
  @IsNotEmpty()
  @IsUrl()
  body: string;
  
  @IsNotEmpty()
  @IsString()
  title: string;
  

}

export class ItemParams {
  @IsNotEmpty()
  @IsMongoId()
  itemid: string;
}
