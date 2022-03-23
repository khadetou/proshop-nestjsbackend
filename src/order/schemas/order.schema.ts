import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  })
  orderItmes: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
  }[];

  @Prop({
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  })
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({
    type: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  })
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  @Prop({ type: Number, required: true, default: 0.0 })
  itemsPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  taxPrice: number;
  @Prop({ type: Number, required: true, default: 0.0 })
  shippingPrice: number;
  @Prop({ type: Number, required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;
  @Prop({ type: Date })
  paidAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isShipped: boolean;
  @Prop({ type: Date })
  shippedAt: Date;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
