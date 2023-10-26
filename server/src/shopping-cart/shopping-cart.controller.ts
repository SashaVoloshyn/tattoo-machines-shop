import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  AddToCartResponse,
  GetAllResponse,
  UpdateCountRequest,
  UpdateCountResponse,
  UpdateTotalPriceRequest,
  UpdateTotalPriceResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  gatAll(@Param('id') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToCartResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/count/:id')
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') machineId: string,
  ) {
    return this.shoppingCartService.updateCount(count, machineId);
  }

  @ApiOkResponse({ type: UpdateTotalPriceResponse })
  @ApiBody({ type: UpdateTotalPriceRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/total-price/:id')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') machineId: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, machineId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') machineId: string) {
    return this.shoppingCartService.remove(machineId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') userId: string) {
    return this.shoppingCartService.removeAll(userId);
  }
}
