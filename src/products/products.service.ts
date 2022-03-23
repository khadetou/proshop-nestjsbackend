import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { createReviewsDto } from './dto/create-reviews.dto';
import { GetProductsFilterDto } from './dto/get-products.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  //GET ALL PRODUCTS
  async getProducts(getProductsFilterDto: GetProductsFilterDto): Promise<any> {
    let { pageSize, pageNumber, keyword } = getProductsFilterDto;

    pageSize = 10;
    const page = Number(pageNumber) || 1;

    keyword = keyword
      ? {
          name: { $regex: keyword, $options: 'i' },
        }
      : {};

    const count = await this.productModel.countDocuments({ ...keyword });
    const products = await this.productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return { products, page, pages: Math.ceil(count / pageSize) };
  }

  //CREATE PRODUCT
  async createProduct(
    createProductDto: CreateProductDto,
    user: any,
  ): Promise<Product> {
    const {
      name,
      image,
      brand,
      category,
      description,
      rating,
      price,
      countInStock,
    } = createProductDto;

    const productField = {
      user: user._id,
      name: name && name,
      image: image && image,
      brand: brand && brand,
      category: category && category,
      description: description && description,
      rating: rating && rating,
      price: price && price,
      countInStock: countInStock && countInStock,
    };

    let product = new this.productModel(productField);
    try {
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //CREATE REVIEWS
  async createReviews(
    createReviewsDto: createReviewsDto,
    id: string,
    user: any,
  ): Promise<Product> {
    let product = await this.productModel.findById(id);
    const { rating, comment } = createReviewsDto;

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === id,
      );
      if (alreadyReviewed) {
        throw new InternalServerErrorException(
          'You have already reviewed this product',
        );
      }

      product.reviews.push({
        user: user._id,
        name: 'name',
        rating: Number(rating),
        comment: comment,
      });
      product.numbReviews = product.reviews.length;
      product.rating =
        product.reviews.reduceRight((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      try {
        return await product.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    } else {
      throw new InternalServerErrorException('Product not found');
    }
  }
}
