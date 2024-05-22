import { IsDate, IsNotEmpty, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class TableDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  complain: string;

  @IsNotEmpty()
  @IsString()
  barcode: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  serviceTag: string;

  @IsNotEmpty()
  @IsString()
  storage: string;

  @IsNotEmpty()
  @IsString()
  ram: string;

  @IsNotEmpty()
  @IsString()
  cpu: string;

  @IsNotEmpty()
  @IsString()
  mac: string;

  @IsNotEmpty()
  @IsString()
  os: string;

  @IsNotEmpty()
  @IsString()
  pcName: string;

  @IsNotEmpty()
  @IsString()
  powerSupply: string;

  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  operation: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  demand: string;

  @IsDate()
  @Type(() => Date)
  createdDate: Date;

  @IsDate()
  @Type(() => Date)
  modifiedDate: Date;
}
