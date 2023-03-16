import { PartialType, } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class DeleteReviewDto extends PartialType(
  CreateReviewDto,
  ) {}

  
  
