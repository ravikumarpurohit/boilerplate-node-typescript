import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export class Address {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export class AddUserRequest {
  @IsOptional()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsNumber()
  mobile: number;
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @ValidateNested()
  address: Address;
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  lastName: string;
  @IsOptional()
  @IsNumber()
  mobile: number;
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
  @ValidateNested()
  address: Address;
  @IsOptional()
  @IsEnum(Role)
  role: Role;
  @IsOptional()
  @IsBoolean()
  status: Boolean;
}

export class loginUserRequest {
  @IsString()
  email: string;
  @IsString()
  password: string;
}