import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createReviewsDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
