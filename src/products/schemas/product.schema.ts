import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

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
  @Prop(
    raw({
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      createdAt: { type: Date, default: Date.now },
    }),
  )
  reviews: [Record<string, any>];
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
