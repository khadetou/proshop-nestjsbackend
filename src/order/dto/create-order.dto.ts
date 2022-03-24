import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from 'src/products/schemas/product.schema';

export interface OrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product;
}
export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export class CreateOrderDto {
  @IsNotEmpty()
  orderItems: OrderItems[];
  @IsNotEmpty()
  shippingAddress: ShippingAddress;
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
  @IsNumber()
  @IsNotEmpty()
  itemsPrice: number;
  @IsNumber()
  @IsNotEmpty()
  taxPrice: number;
  @IsNumber()
  @IsNotEmpty()
  shippingPrice: number;
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
