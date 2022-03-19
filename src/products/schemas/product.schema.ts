import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type ProductDocument = Product & Document;
export type ReviewsDocument = Reviews & Document;

@Schema()
export class Reviews {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: User;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  rating: number;
  @Prop({ type: String, required: true })
  comment: string;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: String, required: true })
  brand: string;
  @Prop({ type: String, required: true })
  category: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop([Reviews])
  reviews: Reviews[];
  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: Number, required: true, default: 0 })
  numbReviews: number;

  @Prop({ type: Number, required: true, default: 0 })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  countInStock: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
