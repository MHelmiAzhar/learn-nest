import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createBookDto {
  @ApiProperty({
    example: 'Rich Dad Poor Dad',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Buku yang membahas masalah finansial yang dihadapi banyak orang dikarenakan ajaran keliru orang tua mereka mengenai keuangan, yang juga dialaminya semasa kecil dan remaja.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1997,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'Robert Kiyosaki',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  author: string;
}
export class updateBookDto {
  @ApiProperty({
    example: 'Rich Dad Poor Dad',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'Buku yang membahas masalah finansial yang dihadapi banyak orang dikarenakan ajaran keliru orang tua mereka mengenai keuangan, yang juga dialaminya semasa kecil dan remaja.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 1997,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'Robert Kiyosaki',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  author: string;
}
