import { IsDate, IsOptional, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class TableDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date;
  
  @IsOptional()
  @IsString()
  owner: string;

  @IsOptional()
  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  complain: string;

  @IsOptional()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  serviceTag: string;

  @IsOptional()
  @IsString()
  storage: string;

  @IsOptional()
  @IsString()
  ram: string;

  @IsOptional()
  @IsString()
  cpu: string;

  @IsOptional()
  @IsString()
  mac: string;

  @IsOptional()
  @IsString()
  os: string;

  @IsOptional()
  @IsString()
  pcName: string;

  @IsOptional()
  @IsString()
  powerSupply: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  operation: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  demand: string;

  @IsDate()
  @Type(() => Date)
  createdDate: Date;

  @IsDate()
  @Type(() => Date)
  modifiedDate: Date;
}
