import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({ type: Product })
  @Post('/new')
  createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @ApiOkResponse({ type: Product, isArray: true })
  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.findProducts();
  }

  @ApiOkResponse({ type: Product })
  @Get('/:id')
  getOneProduct(@Param('id') id: number) {
    return this.productService.getOneProduct(id);
  }

  @ApiOkResponse({ type: Product })
  @Delete('/delete/:id')
  removeProduct(@Param('id') id: number) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.productService.deleteProduct(id);
  }
}
