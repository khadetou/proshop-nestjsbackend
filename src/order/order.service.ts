import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  //CREATE NEW ORDERS
  async createOrder(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = createOrderDto;
    if (orderItems && orderItems.length === 0) {
      throw new InternalServerErrorException('Order items cannot be empty');
    } else {
      const order = new this.orderModel({
        orderItems,
        user: user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      try {
        return await order.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
