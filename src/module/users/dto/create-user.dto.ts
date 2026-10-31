
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example:"Danish",
        description:'User Full Name'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string

    @ApiProperty({
        example:'danish@example.com',
        description:'user email address',
        type:'string',
        required:true
    })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string
}
