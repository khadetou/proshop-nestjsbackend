import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { createReviewsDto } from './dto/create-reviews.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //CREATE PRODUCT
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  //CREATE REVIEWS
  @Post('/:id/reviews')
  async createReviews(
    @Body() createReviewsDto: createReviewsDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productsService.createReviews(createReviewsDto, id);
  }
}
