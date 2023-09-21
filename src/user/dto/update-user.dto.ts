import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;
}
