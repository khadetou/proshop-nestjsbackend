import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePaymentResultDto } from './dto/update-payment.dto';

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

  //GET ORDER BY ID
  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email');
    if (order) {
      return order;
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }

  //UPDATE ORDER TO PAID
  async updateOrderToPaid(
    id: string,
    updatePaymentResultDto: UpdatePaymentResultDto,
  ): Promise<Order> {
    const { _id, status, update_time, email_address } = updatePaymentResultDto;
    const order = await this.orderModel.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        _id,
        status,
        update_time,
        email_address,
      };
      return await order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }

  //UPDATE ORDER TO DELIVERED
  async updateOrderToDelivered(id: string, user: any): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (order) {
      order.isShipped = true;
      return await order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }
}
