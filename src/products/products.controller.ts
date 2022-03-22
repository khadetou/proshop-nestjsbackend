import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { createReviewsDto } from './dto/create-reviews.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //CREATE PRODUCT
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    console.log(user);
    return await this.productsService.createProduct(createProductDto, user);
  }

  //CREATE REVIEWS
  @Post('/:id/reviews')
  async createReviews(
    @Body() createReviewsDto: createReviewsDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return await this.productsService.createReviews(createReviewsDto, id, user);
  }
}
