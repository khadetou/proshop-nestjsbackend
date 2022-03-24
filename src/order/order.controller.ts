import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/schemas/user.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';

@Controller('order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //CREATE NEW ORDERS
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto, user);
  }
}
