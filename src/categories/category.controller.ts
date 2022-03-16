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

import { CreateCategorytDto, UpdateCategorytDto } from './dto/category.dto';
import { Category } from './entity/category.entity';
import { CategoryService } from './category.service';

@ApiTags('categories')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: Category })
  @Post('/new')
  createCategory(@Body() category: CreateCategorytDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @ApiCreatedResponse({ type: Category })
  @Put('/:id')
  updateCard(
    @Param('id') id: number,
    @Body() category: UpdateCategorytDto,
  ): Promise<Category> {
    if (!id) {
      throw new NotFoundException();
    }
    return this.categoryService.updateCategory(id, category);
  }

  @ApiOkResponse({ type: Category, isArray: true })
  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findCategories();
  }

  @ApiOkResponse({ type: Category })
  @Get('/:id')
  getOneCategory(@Param('id') id: number) {
    return this.categoryService.getOneCategory(id);
  }

  @ApiOkResponse({ type: Category })
  @Delete('/delete/:id')
  removeCategory(@Param('id') id: number) {
    if (!id) {
      throw new NotFoundException();
    }

    return this.categoryService.deleteCategory(id);
  }
}
