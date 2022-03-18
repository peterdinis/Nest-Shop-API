import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { CardService } from './card.service';
  import { UpdateQuantityDto } from "./dto/card.dto"
  import { Cart } from './entity/card.entity';
  
  @ApiTags('card')
  @Controller('card')
  export class CardController {
    constructor(private readonly cardService: CardService) {}
  
    @ApiOkResponse({ type: Cart })
    @ApiNotFoundResponse()
    @Post(':productId')
    addCartItem(@Param('productId') productId: number): Promise<Cart> {
      if (!productId) {
        throw new NotFoundException();
      }
      return this.cardService.addToCart(productId);
    }
  
    @ApiOkResponse({ type: Cart })
    @ApiNotFoundResponse()
    @Delete('delete/:cartId')
    removeItemFromCart(@Param('cartId') cartId: number): Promise<Cart> {
      if (!cartId) {
        throw new NotFoundException();
      }
      return this.cardService.removeFromCart(cartId);
    }
  
    @ApiOkResponse({ type: Cart })
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Put('quanity/:cartId')
    updateQuantity(
      @Param('cartId') cartId: number,
      @Body() quantity: UpdateQuantityDto,
    ): Promise<Cart> {
      if (!cartId) {
        throw new NotFoundException();
      }
      if (quantity.quantity == 0) {
        throw new BadRequestException();
      }
      return this.cardService.updateQuantity(cartId, quantity);
    }
  
    @ApiOkResponse({ type: Cart })
    @Get()
    getAll(): Promise<Cart[]> {
      return this.cardService.getAllCartItems();
    }
  }